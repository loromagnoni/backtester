import { Select } from '@chakra-ui/react';
import { useAssetSelectorModel } from './useAssetSelectorModel';

export const AssetSelector = () => {
    const { onChange, tickers } = useAssetSelectorModel();
    return (
        <Select
            placeholder="Select asset"
            minW={40}
            variant={'outline'}
            onChange={onChange}
        >
            {tickers.map((ticker) => (
                <option key={ticker} value={ticker}>
                    {ticker}
                </option>
            ))}
        </Select>
    );
};
