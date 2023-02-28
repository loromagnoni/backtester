import ChartManager from 'domain/dependencies/managers/chartManager';
import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import { StateSetter } from 'domain/dependencies/state/setter';
import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import Timeframe from 'domain/models/timeframe';

function shouldAppendNewCandle(current: number, timeframe: Timeframe) {
  const minutesInCandle = (current + 1) % timeframe.minutes;
  return minutesInCandle === 0;
}

function getCandleAfterMinute(
  lastMinuteCandle: CandleStick,
  currentCandle: CandleStick
): CandleStick {
  const candle = { ...currentCandle };
  if (lastMinuteCandle.high > candle.high) candle.high = lastMinuteCandle.high;
  if (lastMinuteCandle.low < candle.low) candle.low = lastMinuteCandle.low;
  candle.open = lastMinuteCandle.open;
  return candle;
}

interface ForwardReplayDependencies {
  stateSetter: StateSetter;
  replayDate: Date;
  chartManager: ChartManager;
  selectedAsset: Asset;
  assetRepository: AssetRepository;
  selectedTimeframe: Timeframe;
  cumulativeTicks: number;
  lastCandle: CandleStick;
}

export default async function forwardReplay({
  replayDate,
  stateSetter,
  chartManager,
  assetRepository,
  selectedAsset,
  selectedTimeframe,
  cumulativeTicks,
  lastCandle,
}: ForwardReplayDependencies) {
  const replayTimestamp = replayDate.getTime();
  const minute = await assetRepository.getCandleByMinute(
    selectedAsset,
    new Date(replayTimestamp)
  );
  const newCandle = getCandleAfterMinute(lastCandle, minute);
  const nextMinute = replayTimestamp + 60 * 1000;

  if (shouldAppendNewCandle(cumulativeTicks, selectedTimeframe)) {
    chartManager.appendToChart(minute);
    stateSetter({
      replayTimestamp: nextMinute,
      cumulativeTicks: 0,
      lastCandle: minute,
    });
  } else {
    chartManager.updateLastCandle({
      low: newCandle.low,
      close: newCandle.close,
      open: newCandle.open,
      high: newCandle.high,
    });
    stateSetter({
      replayTimestamp: nextMinute,
      cumulativeTicks: cumulativeTicks + 1,
      lastCandle: newCandle,
    });
  }
}
