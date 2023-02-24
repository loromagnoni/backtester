import useDependencies from 'app/dependencies/useDependencies';
import getAvailableAssets from 'domain/useCase/getAvailableAssets';
import { useMemo } from 'react';

export default function useGetAvailableAssets() {
  const { assetRepository } = useDependencies();
  return useMemo(
    () =>
      getAvailableAssets({
        getFromDataSource: assetRepository.getAvailableAssets,
      }),
    [assetRepository.getAvailableAssets]
  );
}
