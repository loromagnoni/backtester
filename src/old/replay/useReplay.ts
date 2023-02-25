import { useEffect } from 'react';
import { useStore } from 'react-redux';
import {
    changeCurrentPrice,
    nextMinuteReplay,
    RootState,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';

let interval: NodeJS.Timer | undefined;

export const useReplay = () => {
    const isReplaying = useAppSelector((state) => state.app.isReplaying);
    const replayVelocity = useAppSelector((state) => state.app.replayVelocity);
    const store = useStore();
    const dispatch = useAppDispatch();
    useEffect(() => {
        clearInterval(interval);
        if (isReplaying) {
            if (replayVelocity !== 0) {
                interval = setInterval(() => {
                    dispatch(nextMinuteReplay());
                    dispatch(
                        changeCurrentPrice(
                            (store.getState() as RootState).app.lastCandle!
                        )
                    );
                }, 1000 / replayVelocity);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isReplaying, replayVelocity]);
};
