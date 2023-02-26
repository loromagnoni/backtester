import useDependencies from 'app/dependencies/useDependencies';
import updateChart from 'domain/useCase/updateChart';
import { useCallback } from 'react';
import useReplayDate from './useReplayDate';
import useSelectedAsset from './useSelectedAsset';
import useSelectedTimeframe from './useSelectedTimeframe';

export default function useUpdateChart() {
  const { assetRepository, chartManager } = useDependencies();
  const replayDate = useReplayDate();
  const selectedAsset = useSelectedAsset();
  const selectedTimeframe = useSelectedTimeframe();
  return useCallback(
    () =>
      updateChart({
        chartManager,
        assetRepository,
        replayDate,
        selectedTimeframe,
        selectedAsset,
      }),
    [
      assetRepository,
      chartManager,
      replayDate,
      selectedAsset,
      selectedTimeframe,
    ]
  );
}
