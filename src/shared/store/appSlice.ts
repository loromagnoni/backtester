import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    CandlestickData,
    IChartApi,
} from 'core/lightweight-chart/lightweight-charts.js';
import { AssetData } from 'shared/data/assets';
import { Timeframe } from 'shared/data/timeframes';
import { findAssetByTicker } from 'shared/services/assetService';
import { getCandleAfterMinute } from 'shared/services/candleCalculatorService';

export type SerieProvider = (chart: IChartApi) => void;

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        timeframe: undefined as Timeframe | undefined,
        asset: undefined as AssetData | undefined,
        assetSerie: [] as CandlestickData[],
        replayVelocity: 1,
        isReplaying: false,
        startingReplayTimestamp: new Date().getTime(),
        currentReplayTimestamp: new Date().getTime(),
        index: 0,
        lastCandle: undefined as CandlestickData | undefined,
    },
    reducers: {
        assetSelected: (state, action: PayloadAction<string>) => {
            state.asset = findAssetByTicker(action.payload);
        },
        resetReplay: (
            state,
            action: PayloadAction<{
                candle: CandlestickData;
                initialIndex: number;
            }>
        ) => {
            state.lastCandle = action.payload.candle;
            state.index = action.payload.initialIndex;
        },
        setAssetSeries: (state, action: PayloadAction<CandlestickData[]>) => {
            state.assetSerie = action.payload;
        },
        setReplayVelocity: (state, action: PayloadAction<number>) => {
            state.replayVelocity = action.payload;
        },
        setIsReplaying: (state, action: PayloadAction<boolean>) => {
            state.isReplaying = action.payload;
        },
        selectReplayDate: (state, action: PayloadAction<number>) => {
            state.startingReplayTimestamp = action.payload;
            state.currentReplayTimestamp = action.payload;
        },
        selectTimeframe: (
            state,
            action: PayloadAction<Timeframe | undefined>
        ) => {
            state.timeframe = action.payload;
            state.startingReplayTimestamp = state.currentReplayTimestamp;
        },
        setCurrentReplayDate: (state, action: PayloadAction<number>) => {
            state.currentReplayTimestamp = action.payload;
        },
        toggleReplay: (state) => {
            state.isReplaying = !state.isReplaying;
        },
        nextMinuteReplay: (state) => {
            const tick = state.assetSerie[state.index];
            state.currentReplayTimestamp = new Date(
                (tick.time as number) * 1000
            ).getTime();
            const candle = getCandleAfterMinute(
                tick as CandlestickData,
                state.index % state.timeframe!.minutes,
                state.lastCandle
            );
            state.lastCandle = candle;
            state.index++;
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
    resetReplay,
    toggleReplay,
    selectReplayDate,
} = appSlice.actions;
