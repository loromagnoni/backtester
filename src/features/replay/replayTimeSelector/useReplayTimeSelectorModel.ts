import { selectReplayDate, useAppDispatch, useAppSelector } from 'shared/store';
import { useCallback } from 'react';

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
