import { Flex, HStack, VStack } from '@chakra-ui/react';
import AssetSelector from 'app/features/home/assetSelector/AssetSelector';
import ReplayToolbar from 'app/features/home/replayToolbar/ReplayToolbar';
import TimeframeSelector from 'app/features/home/timeframeSelector/TimeframeSelector';
import CandleStickChart from './candlestickChart/CandleStickChart';

export default function HomeLayout() {
  return (
    <VStack h="full">
      <HStack justifyContent="start" w="full" p={2}>
        <Flex flex={3}>
          <AssetSelector />
        </Flex>
        <Flex flex={1}>
          <TimeframeSelector />
        </Flex>
        <Flex flex={10}>
          <ReplayToolbar />
        </Flex>
      </HStack>
      <Flex flex={1} w="full">
        <CandleStickChart />
      </Flex>
      {/* <HStack justifyContent="start" w="full" p={2}>
        <TradeToolbar />
      </HStack> */}
    </VStack>
  );
}
