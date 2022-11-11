import { useCallback, useContext } from 'react';
import { ModalContext } from './ModalProvider';

export const useModal = (modal?: number) => {
    const { isOpen, onOpen, onClose, openedModal, setOpenedModal } =
        useContext(ModalContext);

    const onOpenCallback = useCallback(() => {
        setOpenedModal(modal);
        onOpen();
    }, [modal, onOpen, setOpenedModal]);

    const onCloseCallback = useCallback(() => {
        setOpenedModal(undefined);
        onClose();
    }, [onClose, setOpenedModal]);

    return {
        isOpen: isOpen && openedModal === modal,
        onClose: onCloseCallback,
        onOpen: onOpenCallback,
    };
};
