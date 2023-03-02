import {
  CandlestickData,
  ColorType,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'dependencies/managers/chartManager/lightweight-chart/lightweight-charts';
import CandleStick from 'domain/models/candlestick';
import ChartManager from 'domain/dependencies/managers/chartManager';
import { UTCTimestamp } from 'lightweight-charts';

let serie: ISeriesApi<'Candlestick'> | undefined;
let chart: IChartApi | undefined;

export const colors = {
  priceFormat: {
    type: 'price' as const,
    precision: 6,
    minMove: 0.000001,
  },
  background: '#253248',
  line: 'gray',
  text: 'rgba(255, 255, 255, 0.9)',
  downColor: '#ff4976',
  borderDownColor: '#ff4976',
  borderUpColor: '#4bffb5',
  wickDownColor: '#838ca1',
  wickUpColor: '#838ca1',
  grid: {
    vertLines: {
      color: '#334158',
    },
    horzLines: {
      color: '#334158',
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  priceScale: {
    borderColor: '#485c7b',
  },
  timeScale: {
    borderColor: '#485c7b',
    timeVisible: true,
    secondsVisible: true,
  },
};

export default function chartManager(): ChartManager {
  let lastTimeAdded: number | undefined;
  return {
    initChart(ref: React.RefObject<HTMLDivElement>) {
      const handleResize = () => {
        chart?.applyOptions({
          width: ref.current!.clientWidth,
          height: ref.current!.clientHeight,
          ...colors,
        });
      };
      window.addEventListener('resize', handleResize);
      chart = createChart(ref.current!, {
        layout: {
          background: {
            type: ColorType.Solid,
            color: colors.background,
          },
          textColor: colors.text,
        },
        width: ref.current!.clientWidth,
        height: ref.current!.clientHeight,
        ...colors,
      });
      chart?.timeScale().fitContent();
      serie = chart!.addCandlestickSeries(colors);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart?.remove();
      };
    },
    resetChart(data: CandleStick[]) {
      const mapped: CandlestickData[] = data.map((candle) => ({
        ...candle,
        time: candle.time as UTCTimestamp,
      }));
      serie?.setData(mapped);
      lastTimeAdded = data[data.length - 1].time;
    },
    updateLastCandle(data) {
      if (!lastTimeAdded)
        throw new Error('Need to set serie before updating last candle!');
      serie?.update({
        ...data,
        time: lastTimeAdded as UTCTimestamp,
      });
    },
    appendToChart(tick: CandleStick) {
      lastTimeAdded = tick.time;
      serie?.update({
        ...tick,
        time: tick.time as UTCTimestamp,
      });
    },
    fillChart() {
      chart?.timeScale().fitContent();
    },
  };
}
