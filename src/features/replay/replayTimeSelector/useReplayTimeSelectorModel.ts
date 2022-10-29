import { useCallback } from 'react';
import {
    useDisplayTimeDate,
    useReplayTimeDate,
} from '../../../shared/stores/useReplayTimeDate';

export const useTimeSelectorModel = () => {
    const [_, setReplayDate] = useReplayTimeDate();
    const [displayDate, setDisplayDate] = useDisplayTimeDate();
    const value = displayDate.toISOString().slice(0, -5);
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(e.target.value);
            setReplayDate(newDate);
            setDisplayDate(newDate);
        },
        [setDisplayDate, setReplayDate]
    );
    return { value, onChange };
};
