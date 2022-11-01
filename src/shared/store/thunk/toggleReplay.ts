import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    nextMinuteReplay,
    RootState,
    startReplay,
    stopReplay,
} from 'shared/store';

export const toggleReplay = createAsyncThunk<void, void, { state: RootState }>(
    'replay/activate',
    async (_, { getState, dispatch }) => {
        let interval: NodeJS.Timeout | undefined = undefined;
        const state = getState();
        const isReplaying = !state.app.value.isReplaying;
        if (isReplaying) {
            if (state.app.value.replayVelocity !== 0) {
                interval = setInterval(() => {
                    dispatch(nextMinuteReplay());
                }, 1000 / state.app.value.replayVelocity);
            }
            dispatch(startReplay(interval));
        } else {
            dispatch(stopReplay());
        }
    }
);
