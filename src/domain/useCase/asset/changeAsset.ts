import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  resetChart: CallableFunction;
  isAssetDataAvailable: CallableFunction;
}

export default async function changeAsset({
  stateSetter,
  newAssetSelected,
  resetChart,
  isAssetDataAvailable,
}: ChangeAssetDependencies) {
  if (isAssetDataAvailable()) {
    stateSetter({ assetSelected: newAssetSelected });
    resetChart();
  }
}
