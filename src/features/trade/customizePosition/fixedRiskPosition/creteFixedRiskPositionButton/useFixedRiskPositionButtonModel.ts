import { useModal } from 'core/modal';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { enterCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';

export const useFixedRiskPositionButtonModel = () => {
    const { onClose } = useModal();
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(enterCreateFixedRiskPositionMode());
        onClose();
    }, [dispatch, onClose]);
    return { onClick };
};
