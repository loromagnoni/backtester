import { CandlestickData, IChartApi } from 'lightweight-charts';
import { useCallback, useRef } from 'react';
import { CandleStickSerieData } from '../../chart';
import { SerieProvider } from '../../chart/hooks';
import { Timeframe } from '../../timeframeSelector/data/timeframes';
import { getCandleAfterMinute } from '../../timeframeSelector/helper/getCandleAfterMinute';
import { useReplayCallback } from './useReplayCallback';
type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export const useReplaySerieProvider = (
    options: CandlestickOptions,
    data: CandleStickSerieData,
    timeframe: Timeframe
): SerieProvider => {
    const index = useRef(0);
    const lastCandle = useRef<CandlestickData | undefined>(undefined);
    const [_, setReplayCallback] = useReplayCallback();
    return useCallback(
        (chart: IChartApi) => {
            const serie = chart.addCandlestickSeries(options);
            serie.setData([]);
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
                },
            });
        },
        [data, options, setReplayCallback, timeframe]
    );
};
