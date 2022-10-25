import { CandlestickData, IChartApi } from 'lightweight-charts';
import { useCallback, useRef } from 'react';
import { CandleStickSerieData } from '../../chart';
import { SerieProvider } from '../../chart/hooks';
import { Timeframe } from '../../timeframeSelector/data/timeframes';
import { getCandleAfterMinute } from '../../timeframeSelector/helper/getCandleAfterMinute';
import { applyTimeframe } from '../../timeframeSelector/hooks/useTimeframeProxy';
import { useLastIndex } from './useLastIndex';
import { useReplayCallback } from './useReplayCallback';
type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export const useReplaySerieProvider = (
    options: CandlestickOptions,
    data: CandlestickData[],
    timeframe: Timeframe
): SerieProvider => {
    const index = useRef(0);
    const lastCandle = useRef<CandlestickData | undefined>(undefined);
    const [lastIndex, setLastIndex] = useLastIndex();
    const [_, setReplayCallback] = useReplayCallback();
    return useCallback(
        (chart: IChartApi) => {
            const serie = chart.addCandlestickSeries(options);
            const initialIndex = lastIndex.current ?? 0;
            const timeframeAdapted = applyTimeframe(
                data.slice(0, initialIndex),
                timeframe
            );
            serie.setData(timeframeAdapted);
            index.current = initialIndex;
            setReplayCallback({
                callback: () => {
                    const tick = data[index.current];
                    const candle = getCandleAfterMinute(
                        tick as CandlestickData,
                        index.current % timeframe.minutes,
                        lastCandle.current
                    );
                    serie.update(candle);
                    lastCandle.current = candle;
                    index.current++;
                    setLastIndex(index.current);
                },
            });
        },
        [data, lastIndex, options, setLastIndex, setReplayCallback, timeframe]
    );
};
