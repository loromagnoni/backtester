import useDependencies from 'app/dependencies/useDependencies';
import updateChart from 'domain/useCase/updateChart';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useUpdateChart() {
  const [state, stateSetter] = useGlobalState();
  const { assetRepository, chartManager, timeframeRepository } =
    useDependencies();
  return useCallback(
    () =>
      updateChart({
        state,
        stateSetter,
        assetRepository,
        chartManager,
        timeframeRepository,
      }),
    [assetRepository, chartManager, state, stateSetter, timeframeRepository]
  );
}
