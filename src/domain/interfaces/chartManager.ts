import CandleStick from './candlestick';

export default interface ChartManager {
  initChart: (ref: any) => void;
  resetChart: (serie: CandleStick[]) => void;
  appendToChart: (candle: CandleStick) => void;
  updateLastCandle: (candle: Omit<CandleStick, 'time'>) => void;
}
