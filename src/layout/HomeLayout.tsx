import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/asset/assetSelector/AssetSelector';
import { CandleStickChart } from '../features/chart/candleStickChart/CandleStickChart';
import { ReplayToolbar } from '../features/replay/replayToolbar/ReplayToolbar';
import { TimeframeSelector } from '../features/timeframe/timeframeSelector/TimeframeSelector';

export const HomeLayout = () => {
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
        </VStack>
    );
};
