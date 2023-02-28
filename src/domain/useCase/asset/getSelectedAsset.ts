import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import { StateSetter } from 'domain/dependencies/state/setter';
import { StateSlice } from 'domain/dependencies/state/state';
import Asset from 'domain/models/asset';

interface GetSelectedAssetDependencies {
  state: StateSlice<'assetSelected'>;
  stateSetter: StateSetter;
  assetRepository: AssetRepository;
}

export default function getSelectedAsset({
  state,
  stateSetter,
  assetRepository,
}: GetSelectedAssetDependencies): Asset {
  if (state.assetSelected) return state.assetSelected;
  const firstAssetAvailable = assetRepository.getAvailableAssets()[0];
  stateSetter({ assetSelected: firstAssetAvailable });
  return firstAssetAvailable;
}
