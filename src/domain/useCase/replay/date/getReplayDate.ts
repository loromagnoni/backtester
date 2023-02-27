import { StateSlice } from 'domain/dependencies/state/state';
import getDefaultReplayDate from './getDefaulReplayDate';

interface GetReplayDateDependencies {
  state: StateSlice<'replayTimestamp'>;
}

export default function getReplayDate({
  state,
}: GetReplayDateDependencies): Date {
  if (!state.replayTimestamp) return getDefaultReplayDate();
  return new Date(state.replayTimestamp);
}
