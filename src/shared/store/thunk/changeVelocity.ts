import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, setReplayVelocity } from 'shared/store';
import { activateReplay } from './activateReplay';

export const changeVelocity = createAsyncThunk<
    void,
    number,
    { state: RootState }
>('replay/reset', async (velocity, { getState, dispatch }) => {
    const state = getState();
    clearInterval(state.app.value.replayInterval);
    dispatch(setReplayVelocity(velocity));
    activateReplay(state, dispatch, getState);
});
