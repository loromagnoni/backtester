import { AssetData, assets } from '../data/assets';
import {
    CandleStickSerieData,
    onlyOpenMarketHours,
} from './candleCalculatorService';

export const tickers = Array.from(new Set(assets.map((asset) => asset.ticker)));

export const findAssetByTicker = (ticker: string) =>
    assets.find((asset) => asset.ticker === ticker);

const dateConverter = (d: string): number => {
    const regex = /(\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d):(\d\d)/;
    const [_, day, month, year, hour, minute, second, ...__] = Array.from(
        d.match(regex)!
    );
    return Math.round(
        new Date(+year, +month - 1, +day, +hour, +minute, +second).getTime() /
            1000
    );
};

const chartAdapter = (data: any): CandleStickSerieData => {
    return data.map((item: any) => ({
        time: dateConverter(item['Gmt time']),
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
    }));
};

export const assetQuery = (selectedAsset?: AssetData) => async () => {
    if (selectedAsset) {
        const response = await fetch(selectedAsset.url);
        const data = chartAdapter(await response.json());
        const filtered = data.filter(onlyOpenMarketHours);
        return filtered;
    } else return [];
};
