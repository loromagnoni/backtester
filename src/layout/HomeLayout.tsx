import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/assetSelector/components/AssetSelector';
import { useSelectedAsset } from '../features/assetSelector/hooks/useSelectedAsset';
import { Chart } from '../features/chart';

export const HomeLayout = () => {
    const { selectedAssetSerie } = useSelectedAsset();
    return (
        <VStack h="full">
            <HStack justifyContent="start" w="full" p={2}>
                <Flex flex={3}>
                    <AssetSelector />
                </Flex>
                <Flex flex={10}>
                    {selectedAssetSerie[0]?.toString() ?? 'nope'}
                </Flex>
            </HStack>
            <Flex flex={1} w="full">
                <Chart data={selectedAssetSerie} />
            </Flex>
        </VStack>
    );
};
