import { useCallback } from 'react';
import { tickers } from 'shared/services/assetService';
import { assetSelected, useAppDispatch } from 'shared/store';
import { setTicker } from 'shared/store/dataLoaderSlice';

export const useAssetSelectorModel = () => {
    const dispatch = useAppDispatch();
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(assetSelected(e.target.value));
            dispatch(setTicker(e.target.value));
        },
        [dispatch]
    );

    return { tickers, onChange };
};
