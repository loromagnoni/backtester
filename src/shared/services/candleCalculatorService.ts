import {
  CandlestickData,
  ISeriesApi,
} from 'core/lightweight-chart/lightweight-charts.js';

export type CandleStickSerieData = Parameters<
  ISeriesApi<'Candlestick'>['setData']
>[0];

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

export const getCandlesIndexUntilDate = (
  candles: CandlestickData[],
  date: Date
): number => {
  return candles.filter((candle) => candle.time < date.getTime() / 1000).length;
};

export const onlyOpenMarketHours = (item: CandleStickSerieData[0]): boolean => {
  const date = new Date((item.time as number) * 1000);
  const day = date.getDay();
  const hour = date.getHours();
  return !((day === 5 && hour >= 21) || day === 6 || (day === 0 && hour < 21));
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
