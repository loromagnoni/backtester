import { useCallback } from 'react';
import {
    useDisplayTimeDate,
    useReplayTimeDate,
} from '../../../shared/stores/useReplayTimeDate';
import { useSelectedTimeframe } from '../../../shared/stores/useSelectedTimeframe';
import { timeframes } from '../../../shared/data/timeframes';
import { findTimeframeByLabel } from '../../../shared/services/timeframeService';

export const useTimeframeSelectorModel = () => {
    const [displayDate] = useDisplayTimeDate();
    const [__, setReplayDate] = useReplayTimeDate();
    const [_, setSelectedTimeframe] = useSelectedTimeframe();
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setReplayDate(displayDate);
            setSelectedTimeframe(findTimeframeByLabel(e.target.value)!);
        },
        [displayDate, setReplayDate, setSelectedTimeframe]
    );

    return { onChange, timeframes };
};
