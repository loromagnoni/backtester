import useDependencies from 'app/dependencies/useDependencies';
import resetChart from 'domain/useCase/resetChart';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useSelectedAsset from './useSelectedAsset';
import useSelectedTimeframe from './useSelectedTimeframe';
import useStartingReplayDate from './useStartingReplayDate';

export default function useResetChart() {
  const { assetRepository, chartManager } = useDependencies();
  const startingReplayDate = useStartingReplayDate();
  const selectedAsset = useSelectedAsset();
  const selectedTimeframe = useSelectedTimeframe();
  const [, stateSetter] = useGlobalState();
  return useCallback(
    () =>
      resetChart({
        chartManager,
        assetRepository,
        startingReplayDate,
        selectedTimeframe,
        selectedAsset,
        stateSetter,
      }),
    [
      chartManager,
      assetRepository,
      startingReplayDate,
      selectedTimeframe,
      selectedAsset,
      stateSetter,
    ]
  );
}
