import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const minutesInAWeek = 60 * 24 * 7;

const getNeedReload = (dataLength: number, index: number) =>
    dataLength - index < minutesInAWeek;

export type DataChunk = {
    month: number | undefined;
    year: number | undefined;
    ticker: string | undefined;
};

export const dataLoaderSlice = createSlice({
    name: 'dataLoader',
    initialState: {
        dataLength: 0,
        currentIndex: 0,
        lastChunk: {} as DataChunk,
    },
    reducers: {
        setReplayDate: (state, action: PayloadAction<number>) => {
            const d = new Date(action.payload);
            state.lastChunk = {
                month: d.getMonth() + 1,
                year: d.getFullYear(),
                ticker: state.lastChunk?.ticker,
            };
        },
        setTicker: (state, action: PayloadAction<string>) => {
            state.lastChunk = {
                month: state.lastChunk?.month,
                year: state.lastChunk?.year,
                ticker: action.payload,
            };
        },
    },
});

export const { setTicker, setReplayDate } = dataLoaderSlice.actions;
