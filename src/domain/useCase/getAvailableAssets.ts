import Asset from 'domain/models/asset';

interface GetAvailableAssetsDependencies {
  getFromDataSource: () => Asset[];
}

export default function getAvailableAssets({
  getFromDataSource,
}: GetAvailableAssetsDependencies) {
  return getFromDataSource();
}
