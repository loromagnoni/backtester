import { useCallback } from 'react';
import { timeframes } from '../../../shared/data/timeframes';
import { useAppDispatch } from '../../../shared/store/hooks';
import { findTimeframeByLabel } from '../../../shared/services/timeframeService';
import { selectTimeframe } from '../../../shared/store/appSlice';

export const useTimeframeSelectorModel = () => {
    const dispatch = useAppDispatch();
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(selectTimeframe(findTimeframeByLabel(e.target.value)));
        },
        [dispatch]
    );

    return { onChange, timeframes };
};
