import { ChakraProvider, theme } from '@chakra-ui/react';
import './layout/global.css';
import { HomeLayout } from './layout/HomeLayout';

export const App = () => (
    <ChakraProvider theme={theme}>
        <HomeLayout />
    </ChakraProvider>
);
