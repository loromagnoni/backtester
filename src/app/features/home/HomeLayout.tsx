import { Flex, VStack } from '@chakra-ui/react';
import CandleStickChart from './candlestickChart/CandleStickChart';
import TopToolbar from './topToolbar/TopToolbar';

export default function HomeLayout() {
  return (
    <VStack h="full">
      <TopToolbar />
      <Flex flex={1} w="full">
        <CandleStickChart />
      </Flex>
    </VStack>
  );
}
