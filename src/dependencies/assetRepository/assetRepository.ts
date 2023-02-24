import Asset from 'domain/models/asset';
import assets from './assets';

export default function assetRepository() {
  return {
    getAvailableAssets(): Asset[] {
      return Array.from(
        new Set(assets.map((asset) => ({ label: asset.ticker })))
      );
    },
  };
}
