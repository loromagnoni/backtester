import { shallowEqualArray } from 'core/shallowEqualArray';
import { useEffect } from 'react';
import { updatePriceLines } from 'shared/services/chartService';
import { Trade } from 'shared/services/tradeService';
import { useAppSelector } from 'shared/store';

const limitOrderAdapter = (trade: Trade) => {
    const { takeProfitPrice, stopLossPrice, id } = trade;
    return { takeProfitPrice, stopLossPrice, id };
};

const useOpenPositionsLimitOrders = () =>
    useAppSelector(
        (state) => state.trade.openPositions.map(limitOrderAdapter),
        shallowEqualArray
    );

const useLimitOrders = () =>
    useAppSelector((state) => state.trade.limitOrders, shallowEqualArray);

export const usePriceLines = () => {
    const limitOrdersPositions = useOpenPositionsLimitOrders();
    const limitOrders = useLimitOrders();
    useEffect(() => {
        updatePriceLines(limitOrdersPositions, limitOrders);
    }, [limitOrders, limitOrdersPositions]);
};
