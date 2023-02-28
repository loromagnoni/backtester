import useDependencies from 'app/dependencies/useDependencies';
import Asset from 'domain/models/asset';
import changeAsset from 'domain/useCase/asset/changeAsset';
import { useCallback } from 'react';
import useResetChart from '../chart/useResetChart';
import useReplayDate from '../replay/date/useReplayDate';

export default function useChangeAsset() {
  const { stateSetter, messageManager, assetRepository } = useDependencies();
  const replayDate = useReplayDate();
  const resetChart = useResetChart();
  return useCallback(
    (newAssetSelected: Asset) =>
      changeAsset({
        stateSetter,
        newAssetSelected,
        resetChart,
        messageManager,
        assetRepository,
        replayDate,
      }),
    [stateSetter, resetChart, messageManager, assetRepository, replayDate]
  );
}
