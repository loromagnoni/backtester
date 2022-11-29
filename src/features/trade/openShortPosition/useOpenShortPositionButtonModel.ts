import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { openMarketShort } from 'shared/store/tradeSlice';

export const useOpenShortPositionButtonModel = () => {
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(openMarketShort());
    }, [dispatch]);
    return { onClick };
};
