import { Modal } from 'index';
import { useModal } from 'core/modal';
import { useThrottle } from 'core/render';
import { useCallback } from 'react';
import { Order } from 'shared/services/tradeService';
import {
  totalProfitSelector,
  tradeSelected,
  useAppDispatch,
  useAppSelector,
} from 'shared/store';

export const useTradeListModel = () => {
  const trades = useAppSelector((state) => state.trade.openOrders);
  const { onOpen } = useModal(Modal.EditPosition);
  const dispatch = useAppDispatch();
  const onItemClick = useCallback(
    (order: Order) => {
      dispatch(tradeSelected(order.id));
      onOpen();
    },
    [dispatch, onOpen]
  );
  const total = useAppSelector(totalProfitSelector);
  const throttledTrades = useThrottle(trades, 1000);
  const throttledTotal = useThrottle(total, 1000);
  return {
    trades: throttledTrades,
    onItemClick,
    total: throttledTotal,
  };
};
