import ReplayManager from 'domain/interfaces/replayManager';
import { StateSetter } from 'domain/interfaces/setter';

interface ToggleReplayActivationDependencies {
  isReplaying: boolean;
  stateSetter: StateSetter;
  replayManager: ReplayManager;
}

export default function toggleReplayActivation({
  isReplaying,
  stateSetter,
  replayManager,
}: ToggleReplayActivationDependencies) {
  const newReplayState = !isReplaying;
  stateSetter({ isReplaying: newReplayState });
  if (newReplayState) {
    replayManager.startTimer();
  } else {
    replayManager.endTimer();
  }
}
