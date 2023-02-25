import State from 'domain/interfaces/state';

interface GetIsReplayingDependencies {
  state: State;
}

export default function GetIsReplying({
  state,
}: GetIsReplayingDependencies): boolean {
  return state.isReplaying ?? false;
}
