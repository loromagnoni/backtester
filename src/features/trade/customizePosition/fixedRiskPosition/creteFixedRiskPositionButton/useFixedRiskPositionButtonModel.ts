import { useModal } from 'core/modal';
import { DrawerContext } from 'features/trade/tradeToolbar/DrawerContext';
import { useCallback, useContext } from 'react';
import { useAppDispatch } from 'shared/store';
import { enterCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';

export const useFixedRiskPositionButtonModel = () => {
    const { onClose } = useModal();
    const d = useContext(DrawerContext);
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(enterCreateFixedRiskPositionMode());
        d.onClose();
        onClose();
    }, [d, dispatch, onClose]);
    return { onClick };
};
