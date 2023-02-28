import { ChakraProvider, theme } from '@chakra-ui/react';
import DependencyProvider from './dependencies/DependencyProvider';
import HomeLayout from './features/home/HomeLayout';
import ToastRoot from './features/toast/ToastRoot';
import './global.css';

function WithProviders() {
  return (
    <>
      <ToastRoot />
      <HomeLayout />;
    </>
  );
}

export default function App() {
  return (
    <DependencyProvider>
      <ChakraProvider theme={theme}>
        <WithProviders />
      </ChakraProvider>
    </DependencyProvider>
  );
}
