import { Button } from '@chakra-ui/react';
import { useOpenLongPositionButtonModel } from './useOpenLongPositionButtonModel';

export const OpenLongPositionButton = () => {
    const { onClick } = useOpenLongPositionButtonModel();
    return (
        <Button background={'green.400'} onClick={onClick}>
            Buy
        </Button>
    );
};
