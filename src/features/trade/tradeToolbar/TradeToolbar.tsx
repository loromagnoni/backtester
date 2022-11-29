import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
} from '@chakra-ui/react';
import {
    OpenLongPositionButton,
    OpenShortPositionButton,
    TradeList,
} from 'features/trade';
import { useContext } from 'react';
import {
    CustomizePositionButton,
    ExitFixedRiskPositionButton,
} from '../customizePosition';
import { CustomizePositionModal } from '../customizePosition/customizePositionModal/CustomizePositionModal';
import { useCreateFixedPosition } from '../customizePosition/customizePositionModal/useCreateFixedPosition';
import { useFixedPositionSizeMode } from '../customizePosition/customizePositionModal/useFixedPositionSizeModel';
import { PositionSizeSelector } from '../positionSize';
import { TradeModal } from '../tradeModal/EditTradeModal';
import { DrawerContext, DrawerProvider } from './DrawerContext';

const WithDrawerContext = () => {
    const { onOpen, onClose, isOpen } = useContext(DrawerContext);
    useFixedPositionSizeMode();
    useCreateFixedPosition();
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
                        <CustomizePositionModal />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export const TradeToolbar = () => {
    return (
        <DrawerProvider>
            <WithDrawerContext />
        </DrawerProvider>
    );
};
