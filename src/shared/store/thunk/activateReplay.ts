import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { nextMinuteReplay, startReplay } from '../appSlice';
import { RootState } from '../store';
import { changeCurrentPrice } from '../tradeSlice';

export const activateReplay = (
    state: RootState,
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
) => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (state.app.value.replayVelocity !== 0) {
        interval = setInterval(() => {
            dispatch(nextMinuteReplay());
            dispatch(changeCurrentPrice(getState().app.value.lastCandle!));
        }, 1000 / state.app.value.replayVelocity);
    }
    dispatch(startReplay(interval));
};
