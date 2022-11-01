import { Td, Tr } from '@chakra-ui/react';
import { Trade } from 'shared/services/tradeService';

export const TradeItem = (trade: Trade) => {
    return (
        <Tr key={trade.id}>
            <Td>{trade.entryPrice}</Td>
            <Td>{trade.type}</Td>
            <Td isNumeric>{trade.profit}</Td>
        </Tr>
    );
};
