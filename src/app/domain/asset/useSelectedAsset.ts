import useDependencies from 'app/dependencies/useDependencies';
import getSelectedAsset from 'domain/useCase/asset/getSelectedAsset';
import { useMemo } from 'react';

export default function useSelectedAsset() {
  const { assetRepository, state, stateSetter } = useDependencies();
  return useMemo(
    () =>
      getSelectedAsset({
        state: { assetSelected: state.assetSelected },
        stateSetter,
        assetRepository,
      }),
    [assetRepository, state.assetSelected, stateSetter]
  );
}
