import AssetRepository from 'domain/interfaces/assetRepository';
import assets from './assets';

export default function assetRepository(): AssetRepository {
  return {
    getAvailableAssets() {
      return Array.from(
        new Set(assets.map((asset) => ({ label: asset.ticker })))
      );
    },
  };
}
