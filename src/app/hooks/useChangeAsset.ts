import Asset from 'domain/interfaces/asset';
import changeAsset from 'domain/useCase/changeAsset';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useResetChart from './useResetChart';

export default function useChangeAsset() {
  const [, stateSetter] = useGlobalState();
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
