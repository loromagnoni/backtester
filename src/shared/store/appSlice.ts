import { AssetData } from 'shared/data/assets';
import { Timeframe } from 'shared/data/timeframes';
import { setChartSerie, updateChartSerie } from 'features/chart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findAssetByTicker } from 'shared/services/assetService';
import {
    getCandleAfterMinute,
    getCandlesIndexUntilDate,
    isSameDay,
} from 'shared/services/candleCalculatorService';
import { applyTimeframe } from 'shared/services/timeframeService';
import { CandlestickData, IChartApi } from 'lightweight-charts';

export type SerieProvider = (chart: IChartApi) => void;

const resetChart = (state: any) => {
    if (isSameDay(new Date(state.value.startingReplayTimestamp), new Date())) {
        const timeframeAdapted = applyTimeframe(
            state.value.assetSerie,
            state.value.timeframe
        );
        setChartSerie(timeframeAdapted);
    } else {
        const initialIndex =
            getCandlesIndexUntilDate(
                state.value.assetSerie,
                new Date(state.value.startingReplayTimestamp)
            ) ?? 0;
        const timeframeAdapted = applyTimeframe(
            state.value.assetSerie.slice(0, initialIndex),
            state.value.timeframe
        );
        state.value.lastCandle = timeframeAdapted[timeframeAdapted.length - 1];
        state.value.index = initialIndex;
        setChartSerie(timeframeAdapted);
    }
};

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        value: {
            timeframe: undefined as Timeframe | undefined,
            asset: undefined as AssetData | undefined,
            assetSerie: [] as CandlestickData[],
            replayVelocity: 1,
            isReplaying: false,
            startingReplayTimestamp: new Date().getTime(),
            currentReplayTimestamp: new Date().getTime(),
            replayInterval: undefined as NodeJS.Timeout | undefined,
            index: 0,
            lastCandle: undefined as CandlestickData | undefined,
        },
    },
    reducers: {
        assetSelected: (state, action: PayloadAction<string>) => {
            state.value.asset = findAssetByTicker(action.payload);
        },

        setAssetSeries: (state, action: PayloadAction<CandlestickData[]>) => {
            state.value.assetSerie = action.payload;
            resetChart(state);
        },
        setReplayVelocity: (state, action: PayloadAction<number>) => {
            state.value.replayVelocity = action.payload;
        },
        setIsReplaying: (state, action: PayloadAction<boolean>) => {
            state.value.isReplaying = action.payload;
        },
        selectReplayDate: (state, action: PayloadAction<number>) => {
            state.value.startingReplayTimestamp = action.payload;
            state.value.currentReplayTimestamp = action.payload;
            resetChart(state);
        },
        selectTimeframe: (
            state,
            action: PayloadAction<Timeframe | undefined>
        ) => {
            state.value.timeframe = action.payload;
            state.value.startingReplayTimestamp =
                state.value.currentReplayTimestamp;
            resetChart(state);
        },

        setCurrentReplayDate: (state, action: PayloadAction<number>) => {
            state.value.currentReplayTimestamp = action.payload;
        },
        startReplay: (
            state,
            action: PayloadAction<NodeJS.Timeout | undefined>
        ) => {
            state.value.isReplaying = true;
            state.value.replayInterval = action.payload;
        },
        stopReplay: (state) => {
            state.value.isReplaying = false;
            clearInterval(state.value.replayInterval);
            state.value.replayInterval = undefined;
        },
        nextMinuteReplay: (state) => {
            const tick = state.value.assetSerie[state.value.index];
            state.value.currentReplayTimestamp = new Date(
                (tick.time as number) * 1000
            ).getTime();
            const candle = getCandleAfterMinute(
                tick as CandlestickData,
                state.value.index % state.value.timeframe!.minutes,
                state.value.lastCandle
            );
            state.value.lastCandle = candle;
            state.value.index++;
            updateChartSerie(candle);
        },
    },
});

export const {
    setAssetSeries,
    selectTimeframe,
    assetSelected,
    setReplayVelocity,
    setIsReplaying,
    setCurrentReplayDate,
    nextMinuteReplay,
    stopReplay,
    selectReplayDate,
    startReplay,
} = appSlice.actions;
