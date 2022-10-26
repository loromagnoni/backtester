import { Input } from '@chakra-ui/react';
import {
    useDisplayTimeDate,
    useReplayTimeDate,
} from '../hooks/useReplayTimeDate';

export const ReplayTimeSelector = () => {
    const [_, setReplayDate] = useReplayTimeDate();
    const [displayDate, setDisplayDate] = useDisplayTimeDate();
    return (
        <Input
            size="md"
            type="datetime-local"
            w="auto"
            value={displayDate.toISOString().slice(0, -5)}
            onChange={(e) => {
                const d = new Date(e.target.value);
                setReplayDate(d);
                setDisplayDate(d);
            }}
        />
    );
};
