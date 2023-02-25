import { Box } from '@chakra-ui/react';
import { useCandleStickChartModel } from './useCandleStickChartModel';

export const CandleStickChart = () => {
    const { chartContainerRef } = useCandleStickChartModel();
    return <Box ref={chartContainerRef} w="full"></Box>;
};
