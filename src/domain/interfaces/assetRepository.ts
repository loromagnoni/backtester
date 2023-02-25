import Asset from './asset';

export default interface AssetRepository {
  getAvailableAssets: () => Asset[];
}
