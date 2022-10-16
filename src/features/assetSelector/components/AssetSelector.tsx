import { Select } from '@chakra-ui/react';
import { useAssetsData } from '../hooks/useAssetsData';
import { useSelectedAsset } from '../hooks/useSelectedAsset';

export const AssetSelector = () => {
    const { tickers, findAssetByTicker } = useAssetsData();
    const { setSelectedAsset } = useSelectedAsset();
    return (
        <Select
            variant={'outline'}
            onChange={(e) => {
                setSelectedAsset(findAssetByTicker(e.target.value)!);
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
