import { useCallback } from 'react';
import { selectReplayDate } from '../../../shared/store/appSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';

export const useTimeSelectorModel = () => {
    const dispatch = useAppDispatch();
    const currentReplayDate = useAppSelector(
        (state) => new Date(state.app.value.currentReplayTimestamp)
    );

    const value = currentReplayDate.toISOString().slice(0, -5);
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(e.target.value);
            dispatch(selectReplayDate(newDate.getTime()));
        },
        [dispatch]
    );
    return { value, onChange };
};
