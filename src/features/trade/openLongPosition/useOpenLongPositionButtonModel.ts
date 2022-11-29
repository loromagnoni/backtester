import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { openMarketLong } from 'shared/store/tradeSlice';

export const useOpenLongPositionButtonModel = () => {
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(openMarketLong());
    }, [dispatch]);
    return { onClick };
};
