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
import { TradeItem } from './TradeItem';
import { useTradeListModel } from './useTradeListModel';

export const TradeList = () => {
    const { trades, onItemClick, total } = useTradeListModel();
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
                <Tbody>
                    {trades.map((t) => (
                        <TradeItem key={t.id} trade={t} onClick={onItemClick} />
                    ))}
                </Tbody>

                <Tfoot>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td isNumeric>
                            <b>{total}</b>
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
