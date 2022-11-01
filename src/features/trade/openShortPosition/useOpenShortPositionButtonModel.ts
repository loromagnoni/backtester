import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { openShortPosition } from 'shared/store/tradeSlice';

export const useOpenShortPositionButtonModel = () => {
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(openShortPosition());
    }, [dispatch]);
    return { onClick };
};
