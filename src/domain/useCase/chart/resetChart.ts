import ChartManager from 'domain/dependencies/managers/chartManager';
import MessageManager from 'domain/dependencies/managers/messageManager';
import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import SerieNotFoundError from 'domain/dependencies/repositories/assetRepository/errors';
import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import Timeframe from 'domain/models/timeframe';

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
  messageManager: MessageManager;
  stateSetter: StateSetter;
}

export default async function resetChart({
  chartManager,
  assetRepository,
  startingReplayDate,
  selectedAsset,
  selectedTimeframe,
  messageManager,
  stateSetter,
}: ResetChartDependencies) {
  const serie = await assetRepository.getAssetSerie(
    selectedAsset,
    startingReplayDate
  );
  if (serie instanceof SerieNotFoundError) {
    messageManager.showSerieNotFoundMessage();
    return;
  }
  const timeframeAdapted = applyTimeframe(serie, selectedTimeframe);
  // TODO: calculate cumulative ticks, if we start from 0, the first candle of the
  // replay will be always added as new.
  stateSetter({
    cumulativeTicks: 0,
    lastCandle: timeframeAdapted[timeframeAdapted.length - 1],
  });
  chartManager.resetChart(timeframeAdapted);
}
