import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store';
import { toggleReplay } from 'shared/store';

export const usePlayButtonModel = () => {
    const isReplaying = useAppSelector((state) => state.app.value.isReplaying);
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(toggleReplay());
    }, [dispatch]);
    const showPauseIcon = isReplaying;
    return { showPauseIcon, onClick };
};
