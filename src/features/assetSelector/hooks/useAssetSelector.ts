import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CandleStickSerieData } from '../../chart';
import { AssetData } from '../data/assets';
import { onlyOpenMarketHours } from '../helper/onlyOpenMarketHours';
import { useSelectedAssetSerie } from './useSelectedAssetSerie';

const dateConverter = (d: string): number => {
    const regex = /(\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d):(\d\d)/;
    const [_, day, month, year, hour, minute, second, ...__] = Array.from(
        d.match(regex)!
    );
    return Math.round(
        new Date(+year, +month - 1, +day, +hour, +minute, +second).getTime() /
            1000
    );
};

const chartAdapter = (data: any): CandleStickSerieData => {
    return data.map((item: any) => ({
        time: dateConverter(item['Gmt time']),
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
    }));
};

const assetQuery = (selectedAsset?: AssetData) => async () => {
    if (selectedAsset) {
        const response = await fetch(selectedAsset.url);
        const data = chartAdapter(await response.json());
        const filtered = data.filter(onlyOpenMarketHours);
        return filtered;
    } else return [];
};

export const useAssetSelector = () => {
    const [selectedAsset, setSelectedAsset] = useState<AssetData>();
    const [_, setSelectedAssetSerie] = useSelectedAssetSerie();

    useQuery(['selectedAsset', selectedAsset], assetQuery(selectedAsset), {
        onSuccess: setSelectedAssetSerie,
    });

    return { setSelectedAsset };
};
