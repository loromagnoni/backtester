import { useCallback } from 'react';
import { useAppDispatch } from 'shared/store';
import { openLongPosition } from 'shared/store/tradeSlice';

export const useOpenLongPositionButtonModel = () => {
    const dispatch = useAppDispatch();
    const onClick = useCallback(() => {
        dispatch(openLongPosition());
    }, [dispatch]);
    return { onClick };
};
