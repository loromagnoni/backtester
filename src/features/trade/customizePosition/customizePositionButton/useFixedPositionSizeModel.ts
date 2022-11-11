import { MouseEventHandler, MouseEventParams } from 'core/lightweight-chart';
import { useCallback, useEffect } from 'react';
import {
    chartSubscribeClick,
    chartUnsubscribeAllClick,
    getPriceAtY,
} from 'shared/services/chartService';
import { useAppDispatch, useAppSelector } from 'shared/store';
import { onPriceSelected } from 'shared/store/fixedRiskPositionSlice';

let onChartClickRef: MouseEventHandler;

export const useFixedPositionSizeMode = () => {
    const isActive = useAppSelector(
        (state) => state.fixedRiskPositionMode.isActive
    );
    const dispatch = useAppDispatch();
    onChartClickRef = useCallback(
        (param: MouseEventParams) =>
            dispatch(onPriceSelected(getPriceAtY(param.point!.y))),
        [dispatch]
    );
    useEffect(() => {
        isActive
            ? chartSubscribeClick(onChartClickRef)
            : chartUnsubscribeAllClick();
    }, [isActive]);
};
