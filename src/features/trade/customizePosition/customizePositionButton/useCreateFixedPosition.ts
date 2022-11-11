import { useEffect } from 'react';
import {
    openFixedRiskPosition,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';
import { exitCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';

export const useCreateFixedPosition = () => {
    const selectedStopLoss = useAppSelector(
        (state) => state.fixedRiskPositionMode.selectedStopLoss
    );
    const selectedPrice = useAppSelector(
        (state) => state.fixedRiskPositionMode.selectedPrice
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedStopLoss && selectedPrice) {
            dispatch(exitCreateFixedRiskPositionMode());
            dispatch(
                openFixedRiskPosition({
                    entryPrice: selectedPrice,
                    stopLossPrice: selectedStopLoss,
                })
            );
        }
    }, [dispatch, selectedPrice, selectedStopLoss]);
};
