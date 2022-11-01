import { useAppSelector } from 'shared/store';

export const useTradeListModel = () => {
    const trades = useAppSelector((state) => state.trade.openPositions);
    return { trades };
};
