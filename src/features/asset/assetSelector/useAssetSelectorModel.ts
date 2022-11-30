import { assetQuery, tickers } from 'shared/services/assetService';
import {
    assetSelected,
    setAssetSeries,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';
import { useQuery } from '@tanstack/react-query';
import { CandlestickData } from 'core/lightweight-chart/lightweight-charts.js';
import { useCallback } from 'react';
import { setTicker } from 'shared/store/dataLoaderSlice';

export const useAssetSelectorModel = () => {
    const dispatch = useAppDispatch();
    const lastChunk = useAppSelector((state) => state.dataLoader.lastChunk);
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(assetSelected(e.target.value));
            dispatch(setTicker(e.target.value));
        },
        [dispatch]
    );
    const onSuccess = useCallback(
        (serie: CandlestickData[]) => {
            console.log(`Got data! Length: ${serie.length}`);
            dispatch(setAssetSeries(serie));
        },
        [dispatch]
    );

    useQuery([JSON.stringify(lastChunk)], assetQuery(lastChunk), {
        onSuccess: onSuccess,
    });

    return { tickers, onChange };
};
