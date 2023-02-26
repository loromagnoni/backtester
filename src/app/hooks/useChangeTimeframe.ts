import useDependencies from 'app/dependencies/useDependencies';
import changeTimeframe from 'domain/useCase/changeTimeframe';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeTimeframe() {
  const [state, stateSetter] = useGlobalState();
  const { timeframeRepository, chartManager, assetRepository } =
    useDependencies();
  return useCallback(
    (newTimeframeLabel: string) =>
      changeTimeframe({
        stateSetter,
        newTimeframeLabel,
        timeframeRepository,
        state,
        chartManager,
        assetRepository,
      }),
    [assetRepository, chartManager, state, stateSetter, timeframeRepository]
  );
}
