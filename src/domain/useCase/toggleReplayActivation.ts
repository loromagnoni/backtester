import { StateSetter } from 'domain/interfaces/setter';
import State from 'domain/interfaces/state';
import getIsReplaying from './getIsReplaying';

interface ToggleReplayActivationDependencies {
  state: State;
  stateSetter: StateSetter;
}

export default function toggleReplayActivation({
  state,
  stateSetter,
}: ToggleReplayActivationDependencies) {
  const isReplaying = getIsReplaying({ state });
  stateSetter({ isReplaying: !isReplaying });
}
