import State from 'domain/interfaces/state';
import getDefaultReplayDate from './getDefaulReplayDate';

interface GetCurrentReplayDateDependencies {
  state: State;
}

export default function getReplayDate({
  state,
}: GetCurrentReplayDateDependencies): Date {
  if (state.replayTimestamp) return new Date(state.replayTimestamp);
  return getDefaultReplayDate();
}
