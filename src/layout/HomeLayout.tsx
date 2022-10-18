import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/assetSelector/components/AssetSelector';
import { useSelectedAssetSerie } from '../features/assetSelector/hooks/useSelectedAssetSerie';
import { Chart } from '../features/chart';
import { TimeframeSelector } from '../features/timeframeSelector/components/TimeframeSelector';
import { useTimeframeProxy } from '../features/timeframeSelector/hooks/useTimeframeProxy';

export const HomeLayout = () => {
    const [selectedAssetSerie, _] = useSelectedAssetSerie();
    const timeframeAdapted = useTimeframeProxy(selectedAssetSerie);
    return (
        <VStack h="full">
            <HStack justifyContent="start" w="full" p={2}>
                <Flex flex={3}>
                    <AssetSelector />
                </Flex>
                <Flex flex={1}>
                    <TimeframeSelector />
                </Flex>
                <Flex flex={10}></Flex>
            </HStack>
            <Flex flex={1} w="full">
                <Chart data={timeframeAdapted} />
            </Flex>
        </VStack>
    );
};
