import Asset from 'domain/interfaces/asset';
import changeAsset from 'domain/useCase/changeAsset';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeAsset() {
  const [, stateSetter] = useGlobalState();
  return useCallback(
    (newAssetSelected: Asset) => changeAsset({ stateSetter, newAssetSelected }),
    [stateSetter]
  );
}
