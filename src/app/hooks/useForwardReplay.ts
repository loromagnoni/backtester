import useDependencies from 'app/dependencies/useDependencies';
import forwardReplay from 'domain/useCase/forwardReplay';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useReplayDate from './useReplayDate';
import useSelectedAsset from './useSelectedAsset';

export default function useForwardReplay() {
  const replayDate = useReplayDate();
  const [, stateSetter] = useGlobalState();
  const selectedAsset = useSelectedAsset();
  const { chartManager, assetRepository } = useDependencies();
  return useCallback(
    () =>
      forwardReplay({
        replayDate,
        stateSetter,
        selectedAsset,
        chartManager,
        assetRepository,
      }),
    [assetRepository, chartManager, replayDate, selectedAsset, stateSetter]
  );
}
