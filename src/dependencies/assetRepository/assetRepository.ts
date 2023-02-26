import AssetRepository from 'domain/interfaces/assetRepository';
import CandleStick from 'domain/interfaces/candlestick';
import assets from './assets';

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

export const chartAdapter = (data: any): CandleStick[] => {
  return data.map((item: any) => ({
    time: dateConverter(item['Gmt time']),
    open: item.Open,
    high: item.High,
    low: item.Low,
    close: item.Close,
  }));
};

export default function assetRepository(): AssetRepository {
  return {
    getAvailableAssets() {
      return Array.from(
        new Set(assets.map((asset) => ({ label: asset.ticker })))
      );
    },
    async getAssetSerie(asset, date) {
      const url = `/data/${
        asset.label
      }_1m_${date.getFullYear()}${getMonthString(date.getMonth())}.json`;
      const data = await fetch(url);
      const json = await data.json();
      const chartAdapted = chartAdapter(json);
      const filtered = chartAdapted.filter(onlyOpenMarketHours);
      return filtered;
    },
  };
}
