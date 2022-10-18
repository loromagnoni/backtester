import { CandlestickData, OhlcData, UTCTimestamp } from 'lightweight-charts';
import { CandleStickSerieData } from '../../chart';
import { useSelectedTimeframe } from './useSelectedTimeframe';

const applyTimeframe = (data: CandlestickData[], minutesToGroup: number) => {
    const result: CandleStickSerieData = [];
    let candle: Partial<OhlcData> = {};
    for (let i = 0; i < data.length; i++) {
        candle.time = data[i].time;
        candle.open = candle.open ?? data[i].open;
        candle.close = data[i].close;
        candle.high = Math.max(candle.high ?? 0, data[i].high);
        candle.low = Math.min(candle.low ?? Infinity, data[i].low);
        if (i % minutesToGroup === 0) {
            result.push(candle as OhlcData);
            candle = {};
        }
    }
    return result;
};

export const useTimeframeProxy = (serie: CandleStickSerieData) => {
    const [selectedTimeframe, _] = useSelectedTimeframe();
    const converted = applyTimeframe(
        serie as CandlestickData[],
        selectedTimeframe.minutes
    );
    return converted;
};
