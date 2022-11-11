import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from 'core/modal';
import { CustomizePositionModal } from 'features/trade/customizePosition/customizePositionModal/CustomizePositionModal';
import { TradeModal } from 'features/trade/tradeModal/EditTradeModal';
import './layout/global.css';
import { HomeLayout } from './layout/HomeLayout';
import { StoreProvider } from './shared/store/StoreProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'always',
            refetchOnWindowFocus: false,
        },
    },
});

export enum Modal {
    CustomizePosition,
    EditPosition,
}

export const App = () => (
    <StoreProvider>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <TradeModal />
                    <CustomizePositionModal />
                    <HomeLayout />
                </ModalProvider>
            </QueryClientProvider>
        </ChakraProvider>
    </StoreProvider>
);
