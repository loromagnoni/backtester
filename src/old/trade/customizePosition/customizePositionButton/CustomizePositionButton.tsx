import { Button } from '@chakra-ui/react';
import { useCustomizePositionButtonModel } from './useCustomizePositionButtonModel';

export const CustomizePositionButton = () => {
    const { onClick } = useCustomizePositionButtonModel();
    return <Button onClick={onClick}>Customize position</Button>;
};
