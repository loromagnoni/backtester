import { ChakraProvider, theme } from '@chakra-ui/react';
import Dependencies from 'dependencies';
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
