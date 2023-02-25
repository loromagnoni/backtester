/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CandlestickData,
  IChartApi,
} from 'core/lightweight-chart/lightweight-charts';
import Asset from 'domain/interfaces/asset';
import Timeframe from 'domain/interfaces/timeframe';
import { getCandleAfterMinute } from 'shared/services/candleCalculatorService';

export type SerieProvider = (chart: IChartApi) => void;

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    assetSerie: [] as CandlestickData[],
    replayVelocity: 1,
    isReplaying: false,
    startingReplayTimestamp: new Date().getTime(),
    currentReplayTimestamp: new Date().getTime(),
    index: 0,
    lastCandle: undefined as CandlestickData | undefined,
  },
  reducers: {
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
    appendAssetSerie: (state, action: PayloadAction<CandlestickData[]>) => {
      state.assetSerie = [...state.assetSerie, ...action.payload];
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
    selectTimeframe: (state, action: PayloadAction<Timeframe | undefined>) => {
      state.startingReplayTimestamp = state.currentReplayTimestamp;
    },
    setCurrentReplayDate: (state, action: PayloadAction<number>) => {
      state.currentReplayTimestamp = action.payload;
    },
    toggleReplay: (state) => {
      state.isReplaying = !state.isReplaying;
    },
    // nextMinuteReplay: (state) => {
    //   const tick = state.assetSerie[state.index];
    //   state.currentReplayTimestamp = new Date(
    //     (tick.time as number) * 1000
    //   ).getTime();
    //   const candle = getCandleAfterMinute(
    //     tick as CandlestickData,
    //     state.index % state.timeframe!.minutes,
    //     state.lastCandle
    //   );
    //   state.lastCandle = candle;
    //   state.index += 1;
    // },
    setState: (
      state,
      action: PayloadAction<
        Partial<{
          timeframe: Timeframe;
          asset: Asset;
          assetSerie: CandlestickData[];
          replayVelocity: number;
          isReplaying: boolean;
          startingReplayTimestamp: number;
          currentReplayTimestamp: number;
          index: number;
          lastCandle: CandlestickData;
        }>
      >
    ) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const {
  appendAssetSerie,
  setAssetSeries,
  selectTimeframe,
  setReplayVelocity,
  setIsReplaying,
  setCurrentReplayDate,
  resetReplay,
  toggleReplay,
  selectReplayDate,
  setState,
} = appSlice.actions;
