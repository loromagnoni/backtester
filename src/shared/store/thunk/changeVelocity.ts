import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    nextMinuteReplay,
    RootState,
    setReplayVelocity,
    startReplay,
} from 'shared/store';

export const changeVelocity = createAsyncThunk<
    void,
    number,
    { state: RootState }
>('replay/reset', async (velocity, { getState, dispatch }) => {
    let interval: NodeJS.Timeout | undefined = undefined;
    const state = getState();
    clearInterval(state.app.value.replayInterval);
    dispatch(setReplayVelocity(velocity));
    if (state.app.value.isReplaying && state.app.value.replayVelocity !== 0) {
        interval = setInterval(() => {
            dispatch(nextMinuteReplay());
        }, 1000 / state.app.value.replayVelocity);
        dispatch(startReplay(interval));
    }
});
