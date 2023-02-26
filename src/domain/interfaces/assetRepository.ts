import Asset from './asset';
import CandleStick from './candlestick';

export default interface AssetRepository {
  getAvailableAssets: () => Asset[];
  getAssetSerie: (asset: Asset, date: Date) => Promise<CandleStick[]>;
  getCandleByMinute: (asset: Asset, date: Date) => Promise<CandleStick>;
}
