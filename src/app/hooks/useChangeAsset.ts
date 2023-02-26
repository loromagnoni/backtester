import Asset from 'domain/interfaces/asset';
import changeAsset from 'domain/useCase/changeAsset';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useUpdateChart from './useUpdateChart';

export default function useChangeAsset() {
  const [, stateSetter] = useGlobalState();
  const updateChart = useUpdateChart();
  return useCallback(
    (newAssetSelected: Asset) =>
      changeAsset({
        stateSetter,
        newAssetSelected,
        updateChart,
      }),
    [stateSetter, updateChart]
  );
}
