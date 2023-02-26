import Asset from 'domain/interfaces/asset';
import AssetRepository from 'domain/interfaces/assetRepository';
import CandleStick from 'domain/interfaces/candlestick';
import ChartManager from 'domain/interfaces/chartManager';
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
interface UpdateChartDependencies {
  chartManager: ChartManager;
  assetRepository: AssetRepository;
  replayDate: Date;
  selectedAsset: Asset;
  selectedTimeframe: Timeframe;
}

export default async function updateChart({
  chartManager,
  assetRepository,
  replayDate,
  selectedAsset,
  selectedTimeframe,
}: UpdateChartDependencies) {
  const serie = await assetRepository.getAssetSerie(selectedAsset, replayDate);
  const timeframeAdapted = applyTimeframe(serie, selectedTimeframe);
  chartManager.updateChart(timeframeAdapted);
}
