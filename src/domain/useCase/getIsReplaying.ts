import { StateSlice } from 'domain/interfaces/state';

interface GetIsReplayingDependencies {
  state: StateSlice<'isReplaying'>;
}

export default function GetIsReplying({
  state,
}: GetIsReplayingDependencies): boolean {
  return state.isReplaying ?? false;
}
