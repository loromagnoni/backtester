import { useCallback } from 'react';
import { toggleReplay } from '../../../shared/store/appSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';

export const usePlayButtonModel = () => {
    const isReplaying = useAppSelector((state) => state.app.value.isReplaying);
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(toggleReplay());
    }, [dispatch]);
    const showPauseIcon = isReplaying;
    return { showPauseIcon, onClick };
};
