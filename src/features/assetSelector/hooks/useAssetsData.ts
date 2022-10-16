import { assets } from "../data/assets";

export const useAssetsData = () => {
    const tickers = Array.from(new Set(assets.map(asset => asset.ticker)));
    const findAssetByTicker = (ticker: string) => assets.find(asset => asset.ticker === ticker);
    return {tickers, findAssetByTicker};
}