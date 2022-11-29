import { useEffect } from 'react';
import { setSelectedPriceLine } from 'shared/services/chartService';
import { useAppSelector } from 'shared/store';

export const useSelectedPriceLine = () => {
    const selectedPrice = useAppSelector(
        (state) => state.fixedRiskPositionMode.selectedPrice
    );

    useEffect(() => {
        setSelectedPriceLine(selectedPrice);
    }, [selectedPrice]);
};
