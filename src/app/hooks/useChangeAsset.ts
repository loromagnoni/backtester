import Asset from 'domain/models/asset';
import AssetState from 'domain/models/assetState';
import changeAsset from 'domain/useCase/changeAsset';
import { useCallback } from 'react';
import { setState, useAppDispatch } from 'shared/store';
import { setTicker } from 'shared/store/dataLoaderSlice';

export default function useChangeAsset() {
  const dispatch = useAppDispatch();
  const setAssetState = useCallback(
    () =>
      ({ assetSelected }: AssetState) => {
        dispatch(setState({ asset: assetSelected }));
        dispatch(setTicker(assetSelected.label));
      },
    [dispatch]
  );
  return useCallback(
    (asset: Asset) => changeAsset({ assetSelected: asset, setAssetState }),
    [setAssetState]
  );
}
