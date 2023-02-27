import Asset from 'domain/interfaces/asset';
import AssetRepository from 'domain/interfaces/assetRepository';
import CandleStick from 'domain/interfaces/candlestick';
import ChartManager from 'domain/interfaces/chartManager';
import { StateSetter } from 'domain/interfaces/setter';
import Timeframe from 'domain/interfaces/timeframe';

function applyTimeframe(
  data: CandleStick[],
  timeframe: Timeframe
): CandleStick[] {
  const result: CandleStick[] = [];
  if (!timeframe) return result;
  let candle: Partial<CandleStick> = {};
  for (let i = 0; i < data.length; i += 1) {
    candle.time = data[i].time;
    candle.open = candle.open ?? data[i].open;
    candle.close = data[i].close;
    candle.high = Math.max(candle.high ?? 0, data[i].high);
    candle.low = Math.min(candle.low ?? Infinity, data[i].low);
    if (i % timeframe.minutes === 0) {
      result.push({
        time: candle.time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      });
      candle = {};
    }
  }
  return result;
}
interface ResetChartDependencies {
  chartManager: ChartManager;
  assetRepository: AssetRepository;
  startingReplayDate: Date;
  selectedAsset: Asset;
  selectedTimeframe: Timeframe;
  stateSetter: StateSetter;
}

export default async function resetChart({
  chartManager,
  assetRepository,
  startingReplayDate,
  selectedAsset,
  selectedTimeframe,
  stateSetter,
}: ResetChartDependencies) {
  const serie = await assetRepository.getAssetSerie(
    selectedAsset,
    startingReplayDate
  );
  const timeframeAdapted = applyTimeframe(serie, selectedTimeframe);
  // TODO: calculate cumulative ticks
  stateSetter({
    cumulativeTicks: 0,
    lastCandle: timeframeAdapted[timeframeAdapted.length - 1],
  });
  chartManager.resetChart(timeframeAdapted);
}
