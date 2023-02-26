import { StateSetter } from 'domain/interfaces/setter';
import { StateSlice } from 'domain/interfaces/state';
import Timeframe from 'domain/interfaces/timeframe';
import TimeframeRepository from 'domain/interfaces/timeframeRepository';

interface GetSelectedTimeframeDependencies {
  state: StateSlice<'timeframeSelected'>;
  stateSetter: StateSetter;
  timeframeRepository: TimeframeRepository;
}

export default function getSelectedTimeframe({
  state,
  stateSetter,
  timeframeRepository,
}: GetSelectedTimeframeDependencies): Timeframe {
  if (state.timeframeSelected) return state.timeframeSelected;
  const firstTimeframeAvailble =
    timeframeRepository.getAvailableTimeframes()[0];
  stateSetter({ timeframeSelected: firstTimeframeAvailble });
  return firstTimeframeAvailble;
}
