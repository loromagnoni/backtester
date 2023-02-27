import useDependencies from 'app/dependencies/useDependencies';
import Asset from 'domain/models/asset';
import changeAsset from 'domain/useCase/asset/changeAsset';
import { useCallback } from 'react';
import useResetChart from '../chart/useResetChart';

export default function useChangeAsset() {
  const { stateSetter } = useDependencies();
  const resetChart = useResetChart();
  return useCallback(
    (newAssetSelected: Asset) =>
      changeAsset({
        stateSetter,
        newAssetSelected,
        resetChart,
      }),
    [stateSetter, resetChart]
  );
}
