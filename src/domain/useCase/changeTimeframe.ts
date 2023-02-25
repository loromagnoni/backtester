import { StateSetter } from 'domain/interfaces/setter';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';

interface ChangeTimeframeDependencies {
  newTimeframeLabel: string;
  timeframeRepository: TimeframeRepository;
  stateSetter: StateSetter;
}

export default function changeTimeframe({
  newTimeframeLabel,
  timeframeRepository,
  stateSetter,
}: ChangeTimeframeDependencies) {
  const newTimeframe =
    timeframeRepository.getTimeframeByLabel(newTimeframeLabel);
  stateSetter({ timeframeSelected: newTimeframe });
}
