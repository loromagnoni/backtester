import { Button } from '@chakra-ui/react';
import { useExitRiskPositionButtonModel } from './useExitRiskPositionButtonModel';

export const ExitFixedRiskPositionButton = () => {
    const { isVisible, onClick } = useExitRiskPositionButtonModel();
    return isVisible ? (
        <Button onClick={onClick}>Drop fixed risk position</Button>
    ) : null;
};
