import { IChartApi } from "lightweight-charts";
import { CandleStickSerieData } from "../components";
import { SerieProvider } from './useChart';
type CandlestickOptions = Parameters<IChartApi["addCandlestickSeries"]>[0];

export const fixedSerie = (chart:IChartApi, options: CandlestickOptions, data: CandleStickSerieData) => {
    const serie = chart.addCandlestickSeries(options);
    serie.setData(data);
}

export const useFixedSerieProvider = ( options: CandlestickOptions, data: CandleStickSerieData ):  SerieProvider => {
    return (chart:IChartApi) => fixedSerie(chart, options, data);
};