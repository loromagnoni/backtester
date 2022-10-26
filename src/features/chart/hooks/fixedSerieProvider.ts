import { CandlestickData, IChartApi } from 'lightweight-charts';
import { Timeframe } from '../../timeframeSelector/data/timeframes';
import { applyTimeframe } from '../../timeframeSelector/hooks/useTimeframeProxy';
import { SerieProvider } from './useChart';
type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export const fixedSerie = (
    chart: IChartApi,
    options: CandlestickOptions,
    data: CandlestickData[],
    timeframe?: Timeframe
) => {
    const serie = chart.addCandlestickSeries(options);
    const timeframeAdapted = applyTimeframe(data, timeframe);
    serie.setData(timeframeAdapted);
};

export const useFixedSerieProvider = (
    options: CandlestickOptions,
    data: CandlestickData[],
    timeframe?: Timeframe
): SerieProvider => {
    return (chart: IChartApi) => fixedSerie(chart, options, data, timeframe);
};
