import Asset from 'domain/interfaces/asset';
import AssetRepository from 'domain/interfaces/assetRepository';
import { StateSetter } from 'domain/interfaces/setter';
import State from 'domain/interfaces/state';

interface GetSelectedAssetDependencies {
  state: State;
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
