import { shallowEqualArray } from 'core/shallowEqualArray';
import { useEffect } from 'react';
import { updatePriceLines } from 'shared/services/chartService';
import { useAppSelector } from 'shared/store';

export const usePriceLines = () => {
    const orders = useAppSelector(
        (state) =>
            state.trade.openOrders.map((o) => ({
                id: o.id,
                isTriggered: o.isTriggered,
                takeProfitPrice: o.takeProfitPrice,
                stopLossPrice: o.stopLossPrice,
                price: o.price,
                type: o.type,
            })),
        shallowEqualArray
    );
    useEffect(() => {
        updatePriceLines(orders);
    }, [orders]);
};
