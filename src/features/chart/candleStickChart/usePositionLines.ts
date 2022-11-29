import { UTCTimestamp } from 'core/lightweight-chart';
import { useEffect } from 'react';
import { addPositionLine, clearLines } from 'shared/services/chartService';
import {
    getOrderDirection,
    isTriggered,
    OrderDirection,
} from 'shared/services/tradeService';
import { useAppSelector } from 'shared/store';

export const usePositionLines = () => {
    const openPositions = useAppSelector((state) => state.trade.openOrders);
    const currentCandle = useAppSelector((state) => state.trade.currentCandle);

    useEffect(() => {
        clearLines();
        openPositions.filter(isTriggered).forEach((p) =>
            addPositionLine(
                [
                    {
                        value: p.price,
                        time: p.triggeredTimestamp as UTCTimestamp,
                    },
                    {
                        value: currentCandle!.close,
                        time: currentCandle!.time,
                    },
                ],
                getOrderDirection(p) === OrderDirection.LONG
                    ? '#4bffb5'
                    : '#ff4976'
            )
        );
    }, [openPositions, currentCandle]);
};
