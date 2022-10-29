import { isSameDay } from '../../../shared/services/candleCalculatorService';
import { createFixedSerieProvider } from '../../../shared/services/chartService';
import { useReplayTimeDate } from '../../../shared/stores/useReplayTimeDate';
import { useSelectedAssetSerie } from '../../../shared/stores/useSelectedAssetSerie';
import { useSelectedTimeframe } from '../../../shared/stores/useSelectedTimeframe';
import { colors } from './useCandleStickChartModel';
import { useReplaySerieProvider } from './useReplaySerieProvider';

export const useSerieProvider = () => {
    const [selectedAssetSerie] = useSelectedAssetSerie();
    const [selectedTimeframe] = useSelectedTimeframe();
    const [selectedReplayDate] = useReplayTimeDate();
    const replaySerieProvider = useReplaySerieProvider(
        colors,
        selectedAssetSerie,
        selectedTimeframe
    );
    const fixedSerieProvider = createFixedSerieProvider(
        colors,
        selectedAssetSerie,
        selectedTimeframe
    );

    return {
        serieProvider: isSameDay(selectedReplayDate, new Date())
            ? fixedSerieProvider
            : replaySerieProvider,
    };
};
