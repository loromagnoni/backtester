import { Modal } from 'App';
import { useModal } from 'core/modal';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { exitCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';

export const useCustomizePositionModalModel = () => {
    const { isOpen, onOpen, onClose } = useModal(Modal.CustomizePosition);

    const dispatch = useAppDispatch();
    const onCloseCallback = useCallback(() => {
        dispatch(exitCreateFixedRiskPositionMode());
        onClose();
    }, [dispatch, onClose]);

    return {
        isOpen,
        onClose: onCloseCallback,
        onOpen,
    };
};
