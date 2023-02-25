import { Td, Tr } from '@chakra-ui/react';
import { getStringFromOrderType } from 'shared/services/chartService';
import { Order } from 'shared/services/tradeService';

type TradeItemProps = {
    trade: Order;
    onClick: (t: Order) => void;
};

export const TradeItem = ({ trade, onClick }: TradeItemProps) => {
    return (
        <Tr onClick={() => onClick(trade)}>
            <Td>{trade.price}</Td>
            <Td>{getStringFromOrderType(trade.type)}</Td>
            <Td isNumeric>{trade.profit}</Td>
        </Tr>
    );
};
