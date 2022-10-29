import { CandlestickData, IChartApi } from 'lightweight-charts';
import { useMemo, useRef } from 'react';
import { Timeframe } from '../../../shared/data/timeframes';
import {
    createReplaySerieProvider,
    SerieProvider,
} from '../../../shared/services/chartService';
import { useReplayCallback } from '../../../shared/stores/useReplayCallback';
import {
    useDisplayTimeDate,
    useReplayTimeDate,
} from '../../../shared/stores/useReplayTimeDate';
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
    return useMemo(
        () =>
            createReplaySerieProvider(
                options,
                data,
                replayDate,
                lastCandle,
                index,
                setDisplayDate,
                setReplayCallback,
                timeframe
            ),
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
