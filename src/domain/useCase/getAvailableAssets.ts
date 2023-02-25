import AssetRepository from 'domain/interfaces/assetRepository';

interface GetAvailableAssetsDependencies {
  assetRepository: AssetRepository;
}

export default function getAvailableAssets({
  assetRepository,
}: GetAvailableAssetsDependencies) {
  return assetRepository.getAvailableAssets();
}
