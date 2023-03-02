import useDependencies from 'app/dependencies/useDependencies';
import isAssetDataAvailable from 'domain/useCase/asset/isAssetDataAvailable';
import { useMemo } from 'react';

export default function useIsAssetDataAvailable() {
  const { assetRepository, messageManager } = useDependencies();
  return useMemo(
    () => isAssetDataAvailable({ assetRepository, messageManager }),
    [assetRepository, messageManager]
  );
}
