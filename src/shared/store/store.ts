import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';
import { globalSlice } from './globalSlice';
import { tradeSlice } from './tradeSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    trade: tradeSlice.reducer,
    //fixedRiskPositionMode: fixedRiskPositionSlice.reducer,
    //   dataLoader: dataLoaderSlice.reducer,
    global: globalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
