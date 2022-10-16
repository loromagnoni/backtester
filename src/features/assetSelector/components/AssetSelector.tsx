import { Select } from '@chakra-ui/react';
import { useAssetsData } from '../hooks/useAssetsData';

export const AssetSelector = () => {
    const { tickers } = useAssetsData();
    return (
        <Select variant={'outline'}>
            {tickers.map((ticker) => (
                <option key={ticker}>{ticker}</option>
            ))}
        </Select>
    );
};
