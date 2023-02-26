import Asset from 'domain/interfaces/asset';
import AssetRepository from 'domain/interfaces/assetRepository';
import ChartManager from 'domain/interfaces/chartManager';
import { StateSetter } from 'domain/interfaces/setter';

interface ForwardReplayDependencies {
  stateSetter: StateSetter;
  replayDate: Date;
  chartManager: ChartManager;
  selectedAsset: Asset;
  assetRepository: AssetRepository;
}

export default async function forwardReplay({
  replayDate,
  stateSetter,
  chartManager,
  assetRepository,
  selectedAsset,
}: ForwardReplayDependencies) {
  const replayTimestamp = replayDate.getTime();
  const nextMinute = replayTimestamp + 60 * 1000;
  stateSetter({ replayTimestamp: nextMinute });
  const minute = await assetRepository.getCandleByMinute(
    selectedAsset,
    new Date(nextMinute)
  );
  chartManager.appendToChart(minute);
}
