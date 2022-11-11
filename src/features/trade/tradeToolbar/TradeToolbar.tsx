import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import {
    OpenLongPositionButton,
    OpenShortPositionButton,
    TradeList,
} from 'features/trade';
import {
    CustomizePositionButton,
    ExitFixedRiskPositionButton,
} from '../customizePosition';
import { PositionSizeSelector } from '../positionSize';
import { TradeModal } from '../tradeModal/EditTradeModal';

export const TradeToolbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Trade Toolbar</Button>
            <ExitFixedRiskPositionButton />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Trade toolbar
                    </DrawerHeader>
                    <DrawerBody>
                        <HStack>
                            <OpenLongPositionButton />
                            <PositionSizeSelector />
                            <OpenShortPositionButton />
                        </HStack>
                        <CustomizePositionButton />
                        <TradeList />
                        <TradeModal />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
