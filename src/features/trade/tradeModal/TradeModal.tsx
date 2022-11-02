import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useTradeModalModel } from './useTradeModalModel';

export const TradeModal = () => {
    const {
        isOpen,
        onClose,
        onCloseTradeClick,
        onSaveTakeProfitClick,
        takeProfitInputValue,
        onTakeProfitInputChange,
        trade,
    } = useTradeModalModel();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`${trade?.type} @ ${trade?.entryPrice}`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Trade profit: <b>{trade?.profit}</b>
                        <Button
                            colorScheme="red"
                            mr={3}
                            onClick={onCloseTradeClick}
                        >
                            Close trade
                        </Button>
                        <Input
                            placeholder="TP"
                            type={'number'}
                            value={takeProfitInputValue}
                            onChange={onTakeProfitInputChange}
                        ></Input>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onSaveTakeProfitClick}
                        >
                            Save Take Profit
                        </Button>
                        <Input placeholder="SL"></Input>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Save Stop Loss
                        </Button>
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
