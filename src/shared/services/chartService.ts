import { CandlestickData, IChartApi } from 'lightweight-charts';
import { Timeframe } from '../data/timeframes';
import {
    getCandleAfterMinute,
    getCandlesIndexUntilDate,
} from './candleCalculatorService';
import { applyTimeframe } from './timeframeService';

type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export type SerieProvider = (chart: IChartApi) => void;

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

export const createFixedSerieProvider = (
    options: CandlestickOptions,
    data: CandlestickData[],
    timeframe?: Timeframe
): SerieProvider => {
    return (chart: IChartApi) => fixedSerie(chart, options, data, timeframe);
};

export const createReplaySerieProvider = (
    options: CandlestickOptions,
    data: CandlestickData[],
    replayDate: Date,
    lastCandle: { current: CandlestickData | undefined },
    index: { current: number },
    setDisplayDate: (date: Date) => void,
    setReplayCallback: (arg: { callback: () => void }) => void,
    timeframe?: Timeframe
): SerieProvider => {
    return (chart: IChartApi) => {
        const serie = chart.addCandlestickSeries(options);
        const initialIndex = getCandlesIndexUntilDate(data, replayDate) ?? 0;
        const timeframeAdapted = applyTimeframe(
            data.slice(0, initialIndex),
            timeframe
        );
        serie.setData(timeframeAdapted);
        lastCandle.current = timeframeAdapted[timeframeAdapted.length - 1];
        index.current = initialIndex;
        setReplayCallback({
            callback: () => {
                const tick = data[index.current];
                setDisplayDate(new Date((tick.time as number) * 1000));
                const candle = getCandleAfterMinute(
                    tick as CandlestickData,
                    index.current % timeframe!.minutes,
                    lastCandle.current
                );
                serie.update(candle);
                lastCandle.current = candle;
                index.current++;
            },
        });
    };
};
