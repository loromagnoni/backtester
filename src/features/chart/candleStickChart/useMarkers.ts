import { shallowEqualArray } from 'core/shallowEqualArray';
import { useEffect } from 'react';
import {
    getBuyMarker,
    getSellMarker,
    updateMarkers,
} from 'shared/services/chartService';
import { Trade, TradeType } from 'shared/services/tradeService';

import { useAppSelector } from 'shared/store';

const markerAdapter = (trade: Trade) => {
    const { id, entryTimestamp, entryPrice, type } = trade;
    if (type === TradeType.LONG) {
        return getBuyMarker(id, entryTimestamp, 1.0, entryPrice);
    } else {
        return getSellMarker(id, entryTimestamp, 1.0, entryPrice);
    }
};

const useTradeMarkers = () =>
    useAppSelector(
        (state) => state.trade.openPositions.map(markerAdapter),
        shallowEqualArray
    );

export const useMarkers = () => {
    const markers = useTradeMarkers();

    useEffect(() => {
        updateMarkers(markers);
    }, [markers]);
};
