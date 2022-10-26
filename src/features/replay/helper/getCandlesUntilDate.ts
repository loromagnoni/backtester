import { CandlestickData } from 'lightweight-charts';

export const getCandlesIndexUntilDate = (
    candles: CandlestickData[],
    date: Date
): number => {
    return candles.filter((candle) => candle.time < date.getTime() / 1000)
        .length;
};
