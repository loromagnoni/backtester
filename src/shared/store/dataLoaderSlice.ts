import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNextMonthToLoad } from 'shared/services/assetLoaderService';

export type DataChunk = {
    month: number | undefined;
    year: number | undefined;
    ticker: string | undefined;
};

export const dataLoaderSlice = createSlice({
    name: 'dataLoader',
    initialState: {
        lastChunk: {} as DataChunk,
        needsReload: false,
        isLoading: false,
    },
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            console.log('isloading', action.payload);
            state.isLoading = action.payload;
        },
        loadNextChunk: (state) => {
            state.lastChunk = {
                ...getNextMonthToLoad(
                    state.lastChunk.year!,
                    state.lastChunk.month!
                ),
                ticker: state.lastChunk.ticker,
            };
            state.needsReload = true;
        },
        setReplayDate: (state, action: PayloadAction<number>) => {
            const d = new Date(action.payload);
            state.lastChunk = {
                month: d.getMonth() + 1,
                year: d.getFullYear(),
                ticker: state.lastChunk?.ticker,
            };
            state.needsReload = false;
        },
        setTicker: (state, action: PayloadAction<string>) => {
            state.lastChunk = {
                month: state.lastChunk?.month,
                year: state.lastChunk?.year,
                ticker: action.payload,
            };
            state.needsReload = false;
        },
    },
});

export const { setTicker, setReplayDate, loadNextChunk, setIsLoading } =
    dataLoaderSlice.actions;
