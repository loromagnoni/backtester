import { Button } from '@chakra-ui/react';
import { useOpenShortPositionButtonModel } from './useOpenShortPositionButtonModel';

export const OpenShortPositionButton = () => {
    const { onClick } = useOpenShortPositionButtonModel();
    return (
        <Button background={'red.400'} onClick={onClick}>
            Short
        </Button>
    );
};
