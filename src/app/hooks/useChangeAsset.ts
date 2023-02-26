import useDependencies from 'app/dependencies/useDependencies';
import Asset from 'domain/interfaces/asset';
import changeAsset from 'domain/useCase/changeAsset';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeAsset() {
  const [state, stateSetter] = useGlobalState();
  const { chartManager, assetRepository, timeframeRepository } =
    useDependencies();
  return useCallback(
    (newAssetSelected: Asset) =>
      changeAsset({
        stateSetter,
        state,
        newAssetSelected,
        chartManager,
        assetRepository,
        timeframeRepository,
      }),
    [assetRepository, chartManager, state, stateSetter, timeframeRepository]
  );
}
