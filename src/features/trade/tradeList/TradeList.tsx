import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useThrottle } from 'core/render';
import { totalProfitSelector, useAppSelector } from 'shared/store';
import { TradeItem } from './TradeItem';
import { useTradeListModel } from './useTradeListModel';

export const TradeList = () => {
    const { trades } = useTradeListModel();
    const total = useAppSelector(totalProfitSelector);
    const throttledTrades = useThrottle(trades, 1000);
    const throttledTotal = useThrottle(total, 1000);
    return (
        <TableContainer w="full">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Entry Price</Th>
                        <Th>Type</Th>
                        <Th isNumeric>Profit</Th>
                    </Tr>
                </Thead>
                <Tbody>{throttledTrades.map(TradeItem)}</Tbody>

                <Tfoot>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td isNumeric>
                            <b>{throttledTotal}</b>
                        </Td>
                    </Tr>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th isNumeric>Total</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );
};
