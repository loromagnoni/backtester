/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChartApi } from 'core/lightweight-chart/lightweight-charts';
import Timeframe from 'domain/interfaces/timeframe';
import Velocity from 'domain/interfaces/velocity';
import Asset from '../../domain/interfaces/asset';

export type SerieProvider = (chart: IChartApi) => void;

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    assetSelected: undefined as Asset | undefined,
    timeframeSelected: undefined as Timeframe | undefined,
    replayTimestamp: undefined as number | undefined,
    startingReplayTimestamp: undefined as number | undefined,
    isReplaying: undefined as boolean | undefined,
    replayVelocity: undefined as Velocity | undefined,
  },
  reducers: {
    setState: (
      state,
      action: PayloadAction<
        Partial<{
          assetSelected: Asset;
        }>
      >
    ) => {
      console.log('FROM', JSON.stringify(state));
      Object.assign(state, action.payload);
      console.log('TO', JSON.stringify(state));
    },
  },
});

export const { setState } = globalSlice.actions;
