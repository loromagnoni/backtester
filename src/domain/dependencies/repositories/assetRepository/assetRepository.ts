import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import SerieNotFoundError from './errors';

export default interface AssetRepository {
  getAvailableAssets: () => Asset[];
  getAssetSerie: (
    asset: Asset,
    date: Date
  ) => Promise<CandleStick[] | SerieNotFoundError>;
  getCandleByMinute: (asset: Asset, date: Date) => Promise<CandleStick>;
}
