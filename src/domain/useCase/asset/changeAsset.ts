import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';
import { IsAssetDataAvailableUseCase } from './isAssetDataAvailable';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  resetChart: CallableFunction;
  replayDate: Date;
  isAssetDataAvailable: IsAssetDataAvailableUseCase;
}

export default async function changeAsset({
  stateSetter,
  newAssetSelected,
  resetChart,
  replayDate,
  isAssetDataAvailable,
}: ChangeAssetDependencies) {
  if (await isAssetDataAvailable(newAssetSelected, replayDate)) {
    stateSetter({ assetSelected: newAssetSelected });
    resetChart();
  }
}
