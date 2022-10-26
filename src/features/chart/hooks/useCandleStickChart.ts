import { useSelectedAssetSerie } from '../../assetSelector/hooks/useSelectedAssetSerie';
import { useReplaySerieProvider } from '../../replay/hooks/useReplaySerieProvider';
import { useReplayTimeDate } from '../../replay/hooks/useReplayTimeDate';
import { useSelectedTimeframe } from '../../timeframeSelector/hooks/useSelectedTimeframe';
import { colors } from '../components/Chart';
import { useFixedSerieProvider } from './fixedSerieProvider';

const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const useCandleStickChart = () => {
    const [selectedAssetSerie] = useSelectedAssetSerie();
    const [selectedTimeframe] = useSelectedTimeframe();
    const [selectedReplayDate] = useReplayTimeDate();
    const replaySerieProvider = useReplaySerieProvider(
        colors,
        selectedAssetSerie,
        selectedTimeframe
    );
    const fixedSerieProvider = useFixedSerieProvider(
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
