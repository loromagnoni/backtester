import { IChartApi } from 'lightweight-charts';
import { useCallback, useRef } from 'react';
import { CandleStickSerieData } from '../../chart';
import { SerieProvider } from '../../chart/hooks';
import { useReplayCallback } from './useReplayCallback';
type CandlestickOptions = Parameters<IChartApi['addCandlestickSeries']>[0];

export const useReplaySerieProvider = (
    options: CandlestickOptions,
    data: CandleStickSerieData
): SerieProvider => {
    const index = useRef(0);
    const [_, setReplayCallback] = useReplayCallback();
    return useCallback(
        (chart: IChartApi) => {
            const serie = chart.addCandlestickSeries(options);
            serie.setData([]);
            setReplayCallback({
                callback: () => {
                    serie.update(data[index.current % data.length]);
                    index.current++;
                },
            });
        },
        [data, options, setReplayCallback]
    );
};
