import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './layout/global.css';
import { HomeLayout } from './layout/HomeLayout';

const queryClient = new QueryClient();

export const App = () => (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <HomeLayout />
        </QueryClientProvider>
    </ChakraProvider>
);
