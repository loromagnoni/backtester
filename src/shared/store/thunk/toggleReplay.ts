import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, stopReplay } from 'shared/store';
import { activateReplay } from './activateReplay';

export const toggleReplay = createAsyncThunk<void, void, { state: RootState }>(
    'replay/activate',
    async (_, { getState, dispatch }) => {
        const state = getState();
        const isReplaying = !state.app.value.isReplaying;
        if (isReplaying) {
            activateReplay(state, dispatch, getState);
        } else {
            dispatch(stopReplay());
        }
    }
);
