import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AssetSelector } from '../features/assetSelector/components/AssetSelector';
import { useSelectedAssetSerie } from '../features/assetSelector/hooks/useSelectedAssetSerie';
import { Chart, colors } from '../features/chart';
import { ReplayControls } from '../features/replay/components/ReplayControls';
import { useReplaySerieProvider } from '../features/replay/hooks/useReplaySerieProvider';
import { TimeframeSelector } from '../features/timeframeSelector/components/TimeframeSelector';
import { useSelectedTimeframe } from '../features/timeframeSelector/hooks/useSelectedTimeframe';

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
                <FilledChart />
            </Flex>
        </VStack>
    );
};

const FilledChart = () => {
    const [selectedAssetSerie] = useSelectedAssetSerie();
    const [selectedTimeframe] = useSelectedTimeframe();
    const serieProvider = useReplaySerieProvider(
        colors,
        selectedAssetSerie,
        selectedTimeframe
    );
    return <Chart serieProvider={serieProvider} />;
};
