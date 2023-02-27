import useDependencies from 'app/dependencies/useDependencies';
import forwardReplay from 'domain/useCase/replay/forwardReplay';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store/hooks';
import useSelectedAsset from '../asset/useSelectedAsset';
import useCumulativeTicks from '../chart/useCumulativeTicks';
import useLastCandle from '../chart/useLastCandle';
import useSelectedTimeframe from '../timeframe/useSelectedTimeframe';
import useReplayDate from './date/useReplayDate';

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
