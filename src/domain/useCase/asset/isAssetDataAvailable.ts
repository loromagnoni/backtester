import MessageManager from 'domain/dependencies/managers/messageManager';
import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import SerieNotFoundError from 'domain/dependencies/repositories/assetRepository/errors';
import Asset from 'domain/models/asset';

interface IsAssetDataAvailableDependencies {
  assetRepository: AssetRepository;
  messageManager: MessageManager;
}

export type IsAssetDataAvailableUseCase = ReturnType<
  typeof isAssetDataAvailable
>;

export default function isAssetDataAvailable({
  assetRepository,
  messageManager,
}: IsAssetDataAvailableDependencies) {
  return async (assetSelected: Asset, replayDate: Date): Promise<boolean> => {
    const serie = await assetRepository.getAssetSerie(
      assetSelected,
      replayDate
    );
    if (serie instanceof SerieNotFoundError) {
      messageManager.showSerieNotFoundMessage();
      return false;
    }
    return true;
  };
}
