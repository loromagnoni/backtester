import { CandlestickData } from 'lightweight-charts';

export const getCandleAfterMinute = (
    lastMinuteCandle: CandlestickData,
    minutesInCandle: number,
    currentCandle?: CandlestickData
): CandlestickData => {
    if (!currentCandle || minutesInCandle === 0) return lastMinuteCandle;
    const candle = { ...currentCandle };
    if (lastMinuteCandle.high > (candle.high ?? Infinity))
        candle.high = lastMinuteCandle.high;
    if (lastMinuteCandle.low < (candle.low ?? 0))
        candle.low = lastMinuteCandle.low;
    candle.close = lastMinuteCandle.close;
    return candle;
};
