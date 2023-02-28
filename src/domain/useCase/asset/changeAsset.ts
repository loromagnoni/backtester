import MessageManager from 'domain/dependencies/managers/messageManager';
import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import SerieNotFoundError from 'domain/dependencies/repositories/assetRepository/errors';
import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  assetRepository: AssetRepository;
  messageManager: MessageManager;
  resetChart: CallableFunction;
  replayDate: Date;
}

export default async function changeAsset({
  stateSetter,
  newAssetSelected,
  resetChart,
  assetRepository,
  messageManager,
  replayDate,
}: ChangeAssetDependencies) {
  const serie = await assetRepository.getAssetSerie(
    newAssetSelected,
    replayDate
  );
  if (serie instanceof SerieNotFoundError) {
    messageManager.showSerieNotFoundMessage();
    return;
  }
  stateSetter({ assetSelected: newAssetSelected });
  resetChart();
}
