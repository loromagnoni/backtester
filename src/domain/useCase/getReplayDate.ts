import State from 'domain/interfaces/state';

interface GetCurrentReplayDateDependencies {
  state: State;
}

export default function getReplayDate({
  state,
}: GetCurrentReplayDateDependencies): Date {
  return state.replayDate ?? new Date(2000, 1, 1);
}
