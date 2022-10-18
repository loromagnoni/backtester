import { Select } from '@chakra-ui/react';
import { useSelectedTimeframe } from '../hooks/useSelectedTimeframe';
import { useTimeframes } from '../hooks/useTimeframes';

export const TimeframeSelector = () => {
    const { timeframes, findTimeframeByLabel } = useTimeframes();
    const [_, setSelectedTimeframe] = useSelectedTimeframe();
    return (
        <Select
            minW={20}
            variant={'outline'}
            onChange={(e) =>
                setSelectedTimeframe(findTimeframeByLabel(e.target.value)!)
            }
        >
            {timeframes.map((t) => (
                <option key={t.label} value={t.label}>
                    {t.label}
                </option>
            ))}
        </Select>
    );
};
