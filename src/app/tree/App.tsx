import { ChakraProvider, theme } from '@chakra-ui/react';
import Dependencies from 'domain/dependencies';
import DependencyProvider from '../dependencies/DependencyProvider';
import HomeLayout from './home/HomeLayout';
import ToastRoot from './toast/ToastRoot';
import './global.css';

function WithProviders() {
  return (
    <>
      <ToastRoot />
      <HomeLayout />;
    </>
  );
}

interface AppProps {
  dependencies?: Partial<Dependencies>;
}

export default function App({ dependencies = {} }: AppProps) {
  return (
    <DependencyProvider dependencies={dependencies}>
      <ChakraProvider theme={theme}>
        <WithProviders />
      </ChakraProvider>
    </DependencyProvider>
  );
}
