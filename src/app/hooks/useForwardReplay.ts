import useDependencies from 'app/dependencies/useDependencies';
import forwardReplay from 'domain/useCase/forwardReplay';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useCumulativeTicks from './useCumulativeTicks';
import useLastCandle from './useLastCandle';
import useReplayDate from './useReplayDate';
import useSelectedAsset from './useSelectedAsset';
import useSelectedTimeframe from './useSelectedTimeframe';

export default function useForwardReplay() {
  const replayDate = useReplayDate();
  const [, stateSetter] = useGlobalState();
  const selectedAsset = useSelectedAsset();
  const selectedTimeframe = useSelectedTimeframe();
  const lastCandle = useLastCandle();
  const cumulativeTicks = useCumulativeTicks();
  const { chartManager, assetRepository } = useDependencies();
  return useCallback(
    () =>
      forwardReplay({
        replayDate,
        stateSetter,
        selectedAsset,
        chartManager,
        assetRepository,
        lastCandle,
        selectedTimeframe,
        cumulativeTicks,
      }),
    [
      assetRepository,
      chartManager,
      lastCandle,
      replayDate,
      selectedAsset,
      selectedTimeframe,
      cumulativeTicks,
      stateSetter,
    ]
  );
}
