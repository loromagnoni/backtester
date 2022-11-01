import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';
import { tradeSlice } from './tradeSlice';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        trade: tradeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
