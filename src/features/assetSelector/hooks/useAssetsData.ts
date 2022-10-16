import { assets } from "../data/assets";

export const useAssetsData = () => {
    const tickers = Array.from(new Set(assets.map(asset => asset.ticker)));
    return {tickers};
}