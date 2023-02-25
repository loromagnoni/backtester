import useDependencies from 'app/dependencies/useDependencies';
import getAvailableAssets from 'domain/useCase/getAvailableAssets';
import { useMemo } from 'react';

export default function useAvailableAssets() {
  const { assetRepository } = useDependencies();
  return useMemo(
    () => getAvailableAssets({ assetRepository }),
    [assetRepository]
  );
}
