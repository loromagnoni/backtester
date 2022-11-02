import { HStack } from '@chakra-ui/react';
import {
    OpenLongPositionButton,
    OpenShortPositionButton,
    TradeList,
} from 'features/trade';
import { TradeModal } from '../tradeModal/TradeModal';

export const TradeToolbar = () => {
    return (
        <HStack w="full" h={'20hv'}>
            <OpenLongPositionButton />
            <OpenShortPositionButton />
            <TradeList />
            <TradeModal />
        </HStack>
    );
};
