import { Select } from '@chakra-ui/react';
import { useTimeframeSelectorModel } from './useTimeframeSelectorModel';

export const TimeframeSelector = () => {
    const { onChange, timeframes } = useTimeframeSelectorModel();
    return (
        <Select
            placeholder="Select timeframe"
            minW={60}
            variant={'outline'}
            onChange={onChange}
        >
            {timeframes.map((t) => (
                <option key={t.label} value={t.label}>
                    {t.label}
                </option>
            ))}
        </Select>
    );
};
