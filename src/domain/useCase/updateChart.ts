import AssetRepository from 'domain/interfaces/assetRepository';
import CandleStick from 'domain/interfaces/candlestick';
import ChartManager from 'domain/interfaces/chartManager';
import { StateSetter } from 'domain/interfaces/setter';
import State from 'domain/interfaces/state';
import Timeframe from 'domain/interfaces/timeframe';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';
import getReplayDate from './getReplayDate';
import getSelectedAsset from './getSelectedAsset';
import getSelectedTimeframe from './getSelectedTimeframe';

interface UpdateChartDependencies {
  chartManager: ChartManager;
  assetRepository: AssetRepository;
  timeframeRepository: TimeframeRepository;
  state: State;
  stateSetter: StateSetter;
}

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

export default async function updateChart({
  chartManager,
  assetRepository,
  timeframeRepository,
  state,
  stateSetter,
}: UpdateChartDependencies) {
  const replayDate = getReplayDate({ state });
  const selectedAsset = getSelectedAsset({
    state,
    stateSetter,
    assetRepository,
  });
  const serie = await assetRepository.getAssetSerie(selectedAsset, replayDate);
  const timeframe = getSelectedTimeframe({
    state,
    stateSetter,
    timeframeRepository,
  });
  const timeframeAdapted = applyTimeframe(serie, timeframe);
  chartManager.updateChart(timeframeAdapted);
}
