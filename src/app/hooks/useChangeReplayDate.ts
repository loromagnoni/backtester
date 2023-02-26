import useDependencies from 'app/dependencies/useDependencies';
import changeReplayDate from 'domain/useCase/changeReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeReplayDate() {
  const [state, stateSetter] = useGlobalState();
  const { chartManager, assetRepository, timeframeRepository } =
    useDependencies();
  return useCallback(
    (newReplayDate: Date) =>
      changeReplayDate({
        newReplayDate,
        stateSetter,
        state,
        assetRepository,
        timeframeRepository,
        chartManager,
      }),
    [assetRepository, chartManager, state, stateSetter, timeframeRepository]
  );
}
