import { CandlestickData, IChartApi } from 'lightweight-charts';
import { useCallback, useRef } from 'react';
import { SerieProvider } from '../../chart/hooks';
import { Timeframe } from '../../timeframeSelector/data/timeframes';
import { getCandleAfterMinute } from '../../timeframeSelector/helper/getCandleAfterMinute';
import { applyTimeframe } from '../../timeframeSelector/hooks/useTimeframeProxy';
import { getCandlesIndexUntilDate } from '../helper/getCandlesUntilDate';
import { useReplayCallback } from './useReplayCallback';
import { useDisplayTimeDate, useReplayTimeDate } from './useReplayTimeDate';
type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export const useReplaySerieProvider = (
    options: CandlestickOptions,
    data: CandlestickData[],
    timeframe?: Timeframe
): SerieProvider => {
    const index = useRef(0);
    const lastCandle = useRef<CandlestickData | undefined>(undefined);
    const [replayDate] = useReplayTimeDate();
    const [_, setDisplayDate] = useDisplayTimeDate();
    const [__, setReplayCallback] = useReplayCallback();
    return useCallback(
        (chart: IChartApi) => {
            const serie = chart.addCandlestickSeries(options);
            const initialIndex =
                getCandlesIndexUntilDate(data, replayDate) ?? 0;
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
        },
        [
            data,
            options,
            replayDate,
            setDisplayDate,
            setReplayCallback,
            timeframe,
        ]
    );
};
