import { Modal } from 'App';
import { useModal } from 'core/modal';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { exitCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';
import { useCreateFixedPosition } from '../customizePositionButton/useCreateFixedPosition';
import { useFixedPositionSizeMode } from '../customizePositionButton/useFixedPositionSizeModel';

export const useCustomizePositionModalModel = () => {
    const { isOpen, onOpen, onClose } = useModal(Modal.CustomizePosition);
    useFixedPositionSizeMode();
    useCreateFixedPosition();
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
