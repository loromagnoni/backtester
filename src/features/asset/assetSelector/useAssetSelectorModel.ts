import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AssetData } from '../../../shared/data/assets';
import {
    assetQuery,
    findAssetByTicker,
    tickers,
} from '../../../shared/services/assetService';
import { useSelectedAssetSerie } from '../../../shared/stores/useSelectedAssetSerie';

export const useAssetSelectorModel = () => {
    const [selectedAsset, setSelectedAsset] = useState<AssetData>();
    const [_, setSelectedAssetSerie] = useSelectedAssetSerie();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(findAssetByTicker(e.target.value));
    };

    useQuery(['selectedAsset', selectedAsset], assetQuery(selectedAsset), {
        onSuccess: setSelectedAssetSerie,
    });

    return { tickers, onChange };
};
