import AssetRepository from 'domain/interfaces/assetRepository';
import ChartManager from 'domain/interfaces/chartManager';
import State from 'domain/interfaces/state';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';
import Asset from '../interfaces/asset';
import { StateSetter } from '../interfaces/setter';
import updateChart from './updateChart';

interface ChangeAssetDependencies {
  stateSetter: StateSetter;
  newAssetSelected: Asset;
  state: State;
  assetRepository: AssetRepository;
  chartManager: ChartManager;
  timeframeRepository: TimeframeRepository;
}

export default function changeAsset({
  stateSetter,
  newAssetSelected,
  state,
  chartManager,
  assetRepository,
  timeframeRepository,
}: ChangeAssetDependencies) {
  stateSetter({ assetSelected: newAssetSelected });
  updateChart({
    chartManager,
    stateSetter,
    state,
    assetRepository,
    timeframeRepository,
  });
}
