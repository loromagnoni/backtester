import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { CreateFixedRiskPositionButton } from '../fixedRiskPosition/creteFixedRiskPositionButton/CreateFixedRiskPositionButton';
import { FixedPositionRiskSelector } from '../fixedRiskPosition/fixedPositionRiskSelector/FixedPositionRiskSelector';
import { useCustomizePositionModalModel } from './useCustomizePositionModalModel';

export const CustomizePositionModal = () => {
    const { isOpen, onClose } = useCustomizePositionModalModel();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Position</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack>
                            <CreateFixedRiskPositionButton />
                            <FixedPositionRiskSelector />
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
