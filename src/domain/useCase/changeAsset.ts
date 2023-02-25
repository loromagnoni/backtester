import Asset from '../interfaces/asset';
import { StateSetter } from '../interfaces/setter';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
}

export default function changeAsset({
  stateSetter,
  newAssetSelected,
}: ChangeAssetDependencies) {
  stateSetter({ assetSelected: newAssetSelected });
}
