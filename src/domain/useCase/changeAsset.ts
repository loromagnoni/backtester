import Asset from '../interfaces/asset';
import { StateSetter } from '../interfaces/setter';

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
