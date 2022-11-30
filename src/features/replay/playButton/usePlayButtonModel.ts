import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store';
import { toggleReplay } from 'shared/store';
import { useDataLoader } from '../../dataLoading/useDataLoader';
import { useReplay } from './useReplay';

export const usePlayButtonModel = () => {
    const isReplaying = useAppSelector((state) => state.app.isReplaying);
    const dispatch = useAppDispatch();
    useDataLoader();
    useReplay();
    const onClick = useCallback(() => {
        dispatch(toggleReplay());
    }, [dispatch]);
    const showPauseIcon = isReplaying;
    return { showPauseIcon, onClick };
};
