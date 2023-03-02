import { Flex, HStack } from '@chakra-ui/react';
import AssetSelector from './assetSelector/AssetSelector';
import ReplayToolbar from './replayToolbar/ReplayToolbar';
import ResizeChartButton from './ResizeChartButton';
import TimeframeSelector from './timeframeSelector/TimeframeSelector';

export default function TopToolbar() {
  return (
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
      <ResizeChartButton />
    </HStack>
  );
}
