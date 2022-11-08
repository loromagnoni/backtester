import { UTCTimestamp } from 'core/lightweight-chart';
import { useEffect } from 'react';
import { addPositionLine, clearLines } from 'shared/services/chartService';
import { TradeType } from 'shared/services/tradeService';
import { useAppSelector } from 'shared/store';

export const usePositionLines = () => {
    const openPositions = useAppSelector((state) => state.trade.openPositions);
    const currentCandle = useAppSelector((state) => state.trade.currentCandle);

    useEffect(() => {
        clearLines();
        openPositions.forEach((p) =>
            addPositionLine(
                [
                    {
                        value: p.entryPrice,
                        time: p.entryTimestamp as UTCTimestamp,
                    },
                    {
                        value: currentCandle!.close,
                        time: currentCandle!.time,
                    },
                ],
                p.type === TradeType.LONG ? '#4bffb5' : '#ff4976'
            )
        );
    }, [openPositions, currentCandle]);
};
