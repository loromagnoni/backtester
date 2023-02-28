import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';
import { IsAssetDataAvailableUseCase } from 'domain/useCase/asset/isAssetDataAvailable';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
  selectedAsset: Asset;
  resetChart: CallableFunction;
  isAssetDataAvailable: IsAssetDataAvailableUseCase;
}

export default async function changeStartReplayDate({
  stateSetter,
  newReplayDate,
  selectedAsset,
  resetChart,
  isAssetDataAvailable,
}: ChangeReplayDateDependencies) {
  if (await isAssetDataAvailable(selectedAsset, newReplayDate)) {
    const newTimestamp = newReplayDate.getTime();
    stateSetter({
      startingReplayTimestamp: newTimestamp,
      replayTimestamp: newTimestamp,
    });
    resetChart();
  }
}
