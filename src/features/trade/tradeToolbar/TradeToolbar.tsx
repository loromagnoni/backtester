import { HStack } from '@chakra-ui/react';
import {
    OpenLongPositionButton,
    OpenShortPositionButton,
    TradeList,
} from 'features/trade';

export const TradeToolbar = () => {
    return (
        <HStack w="full" h={'20hv'}>
            <OpenLongPositionButton />
            <OpenShortPositionButton />
            <TradeList />
        </HStack>
    );
};
