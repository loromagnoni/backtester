import Asset from 'domain/models/asset';
import changeAsset from 'domain/useCase/asset/changeAsset';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store/hooks';
import useResetChart from '../chart/useResetChart';

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
