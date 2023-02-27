import { StateSetter } from 'domain/dependencies/state/setter';
import { StateSlice } from 'domain/dependencies/state/state';
import getDefaultReplayDate from './getDefaulReplayDate';

interface GetStartingReplayDateDependencies {
  state: StateSlice<'startingReplayTimestamp'>;
  stateSetter: StateSetter;
}

export default function getStartingReplayDate({
  state,
  stateSetter,
}: GetStartingReplayDateDependencies): Date {
  if (state.startingReplayTimestamp)
    return new Date(state.startingReplayTimestamp);
  const defaultReplayDate = getDefaultReplayDate();
  stateSetter({ startingReplayTimestamp: defaultReplayDate.getTime() });
  return defaultReplayDate;
}
