import { Td, Tr } from '@chakra-ui/react';
import { Trade } from 'shared/services/tradeService';

type TradeItemProps = {
    trade: Trade;
    onClick: (t: Trade) => void;
};

export const TradeItem = ({ trade, onClick }: TradeItemProps) => {
    return (
        <Tr onClick={() => onClick(trade)}>
            <Td>{trade.entryPrice}</Td>
            <Td>{trade.type}</Td>
            <Td isNumeric>{trade.profit}</Td>
        </Tr>
    );
};
