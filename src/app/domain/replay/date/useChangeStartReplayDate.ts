import useDependencies from 'app/dependencies/useDependencies';
import useIsAssetDataAvailable from 'app/domain/asset/useIsAssetDataAvailable';
import useSelectedAsset from 'app/domain/asset/useSelectedAsset';
import useResetChart from 'app/domain/chart/useResetChart';
import changeStartReplayDate from 'domain/useCase/replay/date/changeStartReplayDate';
import { useCallback } from 'react';

export default function useChangeStartReplayDate() {
  const { stateSetter } = useDependencies();
  const resetChart = useResetChart();
  const isAssetDataAvailable = useIsAssetDataAvailable();
  const selectedAsset = useSelectedAsset();
  return useCallback(
    (newReplayDate: Date) =>
      changeStartReplayDate({
        newReplayDate,
        stateSetter,
        resetChart,
        isAssetDataAvailable,
        selectedAsset,
      }),
    [stateSetter, resetChart, selectedAsset, isAssetDataAvailable]
  );
}
