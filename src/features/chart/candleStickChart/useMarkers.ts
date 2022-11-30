import { shallowEqualArray } from 'core/shallowEqualArray';
import { useEffect } from 'react';
import {
    getBuyMarker,
    getSellMarker,
    updateMarkers,
} from 'shared/services/chartService';
import {
    getOrderDirection,
    isTriggered,
    Order,
    OrderDirection,
} from 'shared/services/tradeService';

import { useAppSelector } from 'shared/store';

const markerAdapter = (trade: Order) => {
    const { id, triggeredTimestamp, price } = trade;
    if (getOrderDirection(trade) === OrderDirection.LONG) {
        return getBuyMarker(id, triggeredTimestamp, 1.0, price);
    } else {
        return getSellMarker(id, triggeredTimestamp, 1.0, price);
    }
};

const useTradeMarkers = () =>
    useAppSelector(
        (state) =>
            state.trade.openOrders.filter(isTriggered).map(markerAdapter),
        shallowEqualArray
    );

export const useMarkers = () => {
    const markers = useTradeMarkers();

    useEffect(() => {
        updateMarkers(markers);
    }, [markers]);
};
