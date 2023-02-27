import { StateSetter } from 'domain/dependencies/state/setter';
import { StateSlice } from 'domain/dependencies/state/state';
import TimeframeRepository from 'domain/dependencies/repositories/timeframeRepository';
import Timeframe from 'domain/models/timeframe';

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
