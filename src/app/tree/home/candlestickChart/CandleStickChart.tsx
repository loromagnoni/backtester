import { Box } from '@chakra-ui/react';
import useCandleStickChartModel from './useCandleStickChartModel';
import useUpdateChartOnLoad from './useUpdateChartOnLoad';

export default function CandleStickChart() {
  const { chartContainerRef } = useCandleStickChartModel();
  useUpdateChartOnLoad();
  return <Box ref={chartContainerRef} w="full" />;
}
