import { ChakraProvider, theme } from '@chakra-ui/react';
import { Chart } from './features/chart';
import './layout/global.css';

export const App = () => (
    <ChakraProvider theme={theme}>
        <Chart />
    </ChakraProvider>
);
