import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';

interface GetAvailableAssetsDependencies {
  assetRepository: AssetRepository;
}

export default function getAvailableAssets({
  assetRepository,
}: GetAvailableAssetsDependencies) {
  return assetRepository.getAvailableAssets();
}
