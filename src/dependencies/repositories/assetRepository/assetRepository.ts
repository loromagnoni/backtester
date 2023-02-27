import AssetRepository from 'domain/dependencies/repositories/assetRepository';
import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import assets from './assets';
import serieCache from './serieCache';

export const onlyOpenMarketHours = (item: CandleStick): boolean => {
  const date = new Date((item.time as number) * 1000);
  const day = date.getDay();
  const hour = date.getHours();
  return !((day === 5 && hour >= 21) || day === 6 || (day === 0 && hour < 21));
};

const getMonthString = (m: number): string =>
  `${m}`.length > 1 ? `${m}` : `0${m}`;

const dateConverter = (d: string): number => {
  const regex = /(\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d):(\d\d)/;
  const [, day, month, year, hour, minute, second] = Array.from(
    d.match(regex)!
  );
  return Math.round(
    new Date(+year, +month - 1, +day, +hour, +minute, +second).getTime() / 1000
  );
};

function chartAdapter(data: any): CandleStick[] {
  return data.map((item: any) => ({
    time: dateConverter(item['Gmt time']),
    open: item.Open,
    high: item.High,
    low: item.Low,
    close: item.Close,
  }));
}

function beforeDate(date: Date, candle: CandleStick): boolean {
  return candle.time < date.getTime() / 1000;
}

async function getRawSerie(
  asset: Asset,
  date: Date,
  cache: ReturnType<typeof serieCache>
): Promise<CandleStick[]> {
  const url = `/data/${asset.label}_1m_${date.getFullYear()}${getMonthString(
    date.getMonth() + 1
  )}.json`;
  let serie = cache.getSerie(url);
  if (!serie) {
    const data = await fetch(url);
    const json = await data.json();
    serie = chartAdapter(json);
    cache.saveSerie(serie, url);
  }
  return serie;
}

export default function assetRepository(): AssetRepository {
  const cache = serieCache();
  return {
    getAvailableAssets() {
      return Array.from(
        new Set(assets.map((asset) => ({ label: asset.ticker })))
      );
    },
    async getAssetSerie(asset, date) {
      const serie = await getRawSerie(asset, date, cache);
      const filtered = serie.filter(
        (candle) => onlyOpenMarketHours(candle) && beforeDate(date, candle)
      );
      return filtered;
    },
    async getCandleByMinute(asset, date) {
      const serie = await getRawSerie(asset, date, cache);
      const candle = serie.find((c) => c.time === date.getTime() / 1000);
      if (!candle) throw new Error('Candle not found!');
      return candle;
    },
  };
}
