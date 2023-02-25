import { Flex, HStack, VStack } from '@chakra-ui/react';
import AssetSelector from 'app/features/assetSelector/AssetSelector';
import ReplayToolbar from 'app/features/replay/replayToolbar/ReplayToolbar';
import TimeframeSelector from 'app/features/timeframeSelector/TimeframeSelector';

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
      {/* <Flex flex={1} w="full">
        <CandleStickChart />
      </Flex> */}
      {/* <HStack justifyContent="start" w="full" p={2}>
        <TradeToolbar />
      </HStack> */}
    </VStack>
  );
}
