import { selectReplayDate, useAppDispatch, useAppSelector } from 'shared/store';
import { useCallback } from 'react';
import { setReplayDate } from 'shared/store/dataLoaderSlice';

export const useTimeSelectorModel = () => {
    const dispatch = useAppDispatch();
    const currentReplayDate = useAppSelector(
        (state) => new Date(state.app.currentReplayTimestamp)
    );

    const value = currentReplayDate.toISOString().slice(0, -5);
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(e.target.value);
            dispatch(selectReplayDate(newDate.getTime()));
            dispatch(setReplayDate(newDate.getTime()));
        },
        [dispatch]
    );
    return { value, onChange };
};
