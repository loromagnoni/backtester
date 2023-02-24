import Asset from '../models/asset';
import AssetState from '../models/assetState';
import { Setter } from '../models/setter';

interface ChangeAssetDependencies {
  setAssetState: Setter<AssetState>;
  assetSelected: Asset;
}

export default function changeAsset({
  setAssetState,
  assetSelected,
}: ChangeAssetDependencies) {
  setAssetState({ assetSelected });
}
