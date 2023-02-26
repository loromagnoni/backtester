import { StateSetter } from 'domain/interfaces/setter';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';

interface ChangeTimeframeDependencies {
  newTimeframeLabel: string;
  timeframeRepository: TimeframeRepository;
  stateSetter: StateSetter;
  resetChart: CallableFunction;
}

export default function changeTimeframe({
  newTimeframeLabel,
  timeframeRepository,
  stateSetter,
  resetChart,
}: ChangeTimeframeDependencies) {
  const newTimeframe =
    timeframeRepository.getTimeframeByLabel(newTimeframeLabel);
  stateSetter({ timeframeSelected: newTimeframe });
  resetChart();
}
