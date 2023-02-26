import { StateSetter } from 'domain/interfaces/setter';
import { StateSlice } from 'domain/interfaces/state';
import getDefaultReplayDate from './getDefaulReplayDate';

interface GetCurrentReplayDateDependencies {
  state: StateSlice<'replayTimestamp'>;
  stateSetter: StateSetter;
}

export default function getReplayDate({
  state,
  stateSetter,
}: GetCurrentReplayDateDependencies): Date {
  if (state.replayTimestamp) return new Date(state.replayTimestamp);
  const defaultReplayDate = getDefaultReplayDate();
  stateSetter({ replayTimestamp: defaultReplayDate.getTime() });
  return defaultReplayDate;
}
