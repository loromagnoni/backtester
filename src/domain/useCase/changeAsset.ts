import Asset from '../interfaces/asset';
import { StateSetter } from '../interfaces/setter';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  updateChart: CallableFunction;
}

export default function changeAsset({
  stateSetter,
  newAssetSelected,
  updateChart,
}: ChangeAssetDependencies) {
  stateSetter({ assetSelected: newAssetSelected });
  updateChart();
}
