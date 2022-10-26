import { Select } from '@chakra-ui/react';
import { useAssetsData } from '../hooks/useAssetsData';
import { useAssetSelector } from '../hooks/useAssetSelector';

export const AssetSelector = () => {
    const { tickers, findAssetByTicker } = useAssetsData();
    const { setSelectedAsset } = useAssetSelector();
    return (
        <Select
            placeholder="Select asset"
            minW={40}
            variant={'outline'}
            onChange={(e) => {
                setSelectedAsset(findAssetByTicker(e.target.value));
            }}
        >
            {tickers.map((ticker) => (
                <option key={ticker} value={ticker}>
                    {ticker}
                </option>
            ))}
        </Select>
    );
};
