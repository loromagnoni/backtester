import { timeframes } from 'shared/data/timeframes';
import { findTimeframeByLabel } from 'shared/services/timeframeService';
import { selectTimeframe, useAppDispatch } from 'shared/store';
import { useCallback } from 'react';

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
