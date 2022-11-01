import { assetQuery, tickers } from 'shared/services/assetService';
import {
    assetSelected,
    setAssetSeries,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';
import { useQuery } from '@tanstack/react-query';
import { CandlestickData } from 'lightweight-charts';
import { useCallback } from 'react';

export const useAssetSelectorModel = () => {
    const dispatch = useAppDispatch();
    const selectedAsset = useAppSelector((state) => state.app.value.asset);
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(assetSelected(e.target.value)),
        [dispatch]
    );
    const onSuccess = useCallback(
        (serie: CandlestickData[]) => dispatch(setAssetSeries(serie)),
        [dispatch]
    );

    useQuery(['selectedAsset', selectedAsset], assetQuery(selectedAsset), {
        onSuccess: onSuccess,
    });

    return { tickers, onChange };
};
