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
    console.log('fetched', url);
    try {
        const json = await data.json();
        console.log('parsed', json.length);
        const chartAdapted = chartAdapter(json);
        const filtered = chartAdapted.filter(onlyOpenMarketHours);
        return filtered;
    } catch (e) {
        console.error(e);
    }
};

export const getNextMonthToLoad = (year: number, month: number) => {
    if (month === 12) {
        return { year: year + 1, month: 1 };
    } else {
        return { year, month: month + 1 };
    }
};
