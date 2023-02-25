import { useEffect } from 'react';
import { updateChartSerie } from 'shared/services/chartService';
import { useAppSelector } from 'shared/store';

export const useLastCandle = () => {
    const lastCandle = useAppSelector((state) => state.app.lastCandle);

    useEffect(() => {
        if (lastCandle) updateChartSerie(lastCandle);
    }, [lastCandle]);
};
