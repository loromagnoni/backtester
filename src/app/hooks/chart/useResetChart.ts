import useDependencies from 'app/dependencies/useDependencies';
import resetChart from 'domain/useCase/chart/resetChart';
import { useCallback } from 'react';
import useSelectedAsset from '../asset/useSelectedAsset';
import useStartingReplayDate from '../replay/date/useStartingReplayDate';
import useSelectedTimeframe from '../timeframe/useSelectedTimeframe';

export default function useResetChart() {
  const { assetRepository, chartManager, stateSetter } = useDependencies();
  const startingReplayDate = useStartingReplayDate();
  const selectedAsset = useSelectedAsset();
  const selectedTimeframe = useSelectedTimeframe();
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
