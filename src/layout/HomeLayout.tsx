import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/assetSelector/components/AssetSelector';
import { Chart } from '../features/chart';

export const HomeLayout = () => {
    return (
        <VStack h="full">
            <HStack justifyContent="start" w="full" p={2}>
                <Flex flex={3}>
                    <AssetSelector />
                </Flex>
                <Flex flex={10}></Flex>
            </HStack>
            <Flex flex={1} w="full">
                <Chart />
            </Flex>
        </VStack>
    );
};
