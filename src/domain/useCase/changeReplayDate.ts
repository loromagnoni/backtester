import AssetRepository from 'domain/interfaces/assetRepository';
import ChartManager from 'domain/interfaces/chartManager';
import State from 'domain/interfaces/state';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';
import { StateSetter } from '../interfaces/setter';
import updateChart from './updateChart';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
  chartManager: ChartManager;
  assetRepository: AssetRepository;
  timeframeRepository: TimeframeRepository;
  state: State;
}

export default function changeReplayDate({
  stateSetter,
  newReplayDate,
  assetRepository,
  state,
  timeframeRepository,
  chartManager,
}: ChangeReplayDateDependencies) {
  stateSetter({ replayTimestamp: newReplayDate.getTime() });
  updateChart({
    state,
    stateSetter,
    assetRepository,
    timeframeRepository,
    chartManager,
  });
}
