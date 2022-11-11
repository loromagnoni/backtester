import { Button } from '@chakra-ui/react';
import { useFixedRiskPositionButtonModel } from './useFixedRiskPositionButtonModel';

export const CreateFixedRiskPositionButton = () => {
    const { onClick } = useFixedRiskPositionButtonModel();
    return <Button onClick={onClick}>Create fixed risk position</Button>;
};
