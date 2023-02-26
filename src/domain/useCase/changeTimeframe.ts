import AssetRepository from 'domain/interfaces/assetRepository';
import ChartManager from 'domain/interfaces/chartManager';
import { StateSetter } from 'domain/interfaces/setter';
import State from 'domain/interfaces/state';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';
import updateChart from './updateChart';

interface ChangeTimeframeDependencies {
  newTimeframeLabel: string;
  timeframeRepository: TimeframeRepository;
  stateSetter: StateSetter;
  state: State;
  chartManager: ChartManager;
  assetRepository: AssetRepository;
}

export default function changeTimeframe({
  newTimeframeLabel,
  timeframeRepository,
  stateSetter,
  chartManager,
  assetRepository,
  state,
}: ChangeTimeframeDependencies) {
  const newTimeframe =
    timeframeRepository.getTimeframeByLabel(newTimeframeLabel);
  stateSetter({ timeframeSelected: newTimeframe });
  updateChart({
    chartManager,
    stateSetter,
    state,
    assetRepository,
    timeframeRepository,
  });
}
