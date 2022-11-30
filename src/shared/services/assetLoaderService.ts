import { DataChunk } from 'shared/store/dataLoaderSlice';
import { chartAdapter } from './assetService';
import { onlyOpenMarketHours } from './candleCalculatorService';

const getMonthString = (m: number): string =>
    `${m}`.length > 1 ? `${m}` : `0${m}`;

export const loadAssetData = async (chunk: DataChunk) => {
    const url = `/data/${chunk.ticker}_1m_${chunk.year}${getMonthString(
        chunk.month!
    )}.json`;
    const data = await fetch(url);
    const json = await data.json();
    const chartAdapted = chartAdapter(json);
    const filtered = chartAdapted.filter(onlyOpenMarketHours);
    return filtered;
};

export const getNextMonthToLoad = (year: number, month: number) => {
    if (month === 12) {
        return { year: year + 1, month: 1 };
    } else {
        return { year, month: month + 1 };
    }
};
