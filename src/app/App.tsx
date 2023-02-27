import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './global.css';
import HomeLayout from './features/home/HomeLayout';
import DependencyProvider from './dependencies/DependencyProvider';

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
    <DependencyProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HomeLayout />
        </QueryClientProvider>
      </ChakraProvider>
    </DependencyProvider>
  );
}
