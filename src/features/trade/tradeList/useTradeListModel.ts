import { useModal } from 'core/modal';
import { useThrottle } from 'core/render';
import { useCallback } from 'react';
import { Trade } from 'shared/services/tradeService';
import {
    totalProfitSelector,
    tradeSelected,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';

export const useTradeListModel = () => {
    const trades = useAppSelector((state) => state.trade.openPositions);
    const { onOpen } = useModal();
    const dispatch = useAppDispatch();
    const onItemClick = useCallback(
        (trade: Trade) => {
            dispatch(tradeSelected(trade.id));
            onOpen();
        },
        [dispatch, onOpen]
    );
    const total = useAppSelector(totalProfitSelector);
    const throttledTrades = useThrottle(trades, 1000);
    const throttledTotal = useThrottle(total, 1000);
    return {
        trades: throttledTrades,
        onItemClick: onItemClick,
        total: throttledTotal,
    };
};
