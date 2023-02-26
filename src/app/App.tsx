import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from 'core/modal/ModalProvider';
import './global.css';
import { StoreProvider } from '../shared/store/StoreProvider';
import HomeLayout from './features/home/HomeLayout';

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

export function App() {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <HomeLayout />
          </ModalProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </StoreProvider>
  );
}
