import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';

export default interface AssetRepository {
  getAvailableAssets: () => Asset[];
  getAssetSerie: (asset: Asset, date: Date) => Promise<CandleStick[]>;
  getCandleByMinute: (asset: Asset, date: Date) => Promise<CandleStick>;
}
