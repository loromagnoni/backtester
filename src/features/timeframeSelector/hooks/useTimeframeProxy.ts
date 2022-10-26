import { CandlestickData, OhlcData } from 'lightweight-charts';
import { CandleStickSerieData } from '../../chart';
import { Timeframe } from '../data/timeframes';

export const applyTimeframe = (
    data: CandlestickData[],
    timeframe?: Timeframe
) => {
    const result: CandleStickSerieData = [];
    if (!timeframe) return result;
    let candle: Partial<OhlcData> = {};
    for (let i = 0; i < data.length; i++) {
        candle.time = data[i].time;
        candle.open = candle.open ?? data[i].open;
        candle.close = data[i].close;
        candle.high = Math.max(candle.high ?? 0, data[i].high);
        candle.low = Math.min(candle.low ?? Infinity, data[i].low);
        if (i % timeframe.minutes === 0) {
            result.push(candle as OhlcData);
            candle = {};
        }
    }
    return result;
};
