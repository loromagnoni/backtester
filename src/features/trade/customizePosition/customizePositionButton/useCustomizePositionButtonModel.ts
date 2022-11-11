import { Modal } from 'App';
import { useModal } from 'core/modal';

export const useCustomizePositionButtonModel = () => {
    const { onOpen } = useModal(Modal.CustomizePosition);
    return {
        onClick: onOpen,
    };
};
