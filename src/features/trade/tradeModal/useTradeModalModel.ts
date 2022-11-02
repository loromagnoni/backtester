import { useModal } from 'core/modal';
import { useCallback, useEffect, useState } from 'react';
import {
    closeTrade,
    takeProfitUpdated,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';

export const useTradeModalModel = () => {
    const { isOpen, onClose } = useModal();
    const dispatch = useAppDispatch();
    const trade = useAppSelector((state) =>
        state.trade.openPositions.find(
            (t) => t.id === state.trade.selectedTradeId
        )
    );
    const onCloseTradeClick = useCallback(() => {
        dispatch(closeTrade(trade!.id));
        onClose();
    }, [dispatch, onClose, trade]);

    const [takeProfitInputValue, setTakeProfitInputValue] = useState<
        number | undefined
    >(trade?.takeProfitPrice);

    const onSaveTakeProfitClick = useCallback(() => {
        dispatch(takeProfitUpdated(Number(takeProfitInputValue)));
        onClose();
    }, [dispatch, onClose, takeProfitInputValue]);

    const onTakeProfitInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTakeProfitInputValue(Number(e.target.value));
        },
        []
    );

    useEffect(() => {
        setTakeProfitInputValue(trade?.takeProfitPrice ?? 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return {
        onClose,
        onCloseTradeClick,
        onSaveTakeProfitClick,
        takeProfitInputValue,
        onTakeProfitInputChange,
        isOpen,
        trade,
    };
};
