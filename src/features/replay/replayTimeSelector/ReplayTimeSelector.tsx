import { Input } from '@chakra-ui/react';
import { useTimeSelectorModel } from './useReplayTimeSelectorModel';

export const ReplayTimeSelector = () => {
    const { value, onChange } = useTimeSelectorModel();
    return (
        <Input
            size="md"
            type="datetime-local"
            w="auto"
            value={value}
            onChange={onChange}
        />
    );
};
