import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  resetChart: CallableFunction;
}

export default function changeAsset({
  stateSetter,
  newAssetSelected,
  resetChart,
}: ChangeAssetDependencies) {
  stateSetter({ assetSelected: newAssetSelected });
  resetChart();
}
