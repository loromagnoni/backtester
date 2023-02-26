import useDependencies from 'app/dependencies/useDependencies';
import getSelectedAsset from 'domain/useCase/getSelectedAsset';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useSelectedAsset() {
  const [state, stateSetter] = useGlobalState();
  const { assetRepository } = useDependencies();
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
