import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/assetSelector/components/AssetSelector';
import { CandleStickChart } from '../features/chart/components/CandleStickChart';
import { ReplayControls } from '../features/replay/components/ReplayControls';
import { TimeframeSelector } from '../features/timeframeSelector/components/TimeframeSelector';

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
                    <ReplayControls />
                </Flex>
            </HStack>
            <Flex flex={1} w="full">
                <CandleStickChart />
            </Flex>
        </VStack>
    );
};
