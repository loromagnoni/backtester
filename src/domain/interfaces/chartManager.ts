import CandleStick from './candlestick';

export default interface ChartManager {
  initChart: (ref: any) => void;
  updateChart: (serie: CandleStick[]) => void;
}
