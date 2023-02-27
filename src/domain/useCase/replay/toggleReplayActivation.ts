import ReplayManager from 'domain/dependencies/managers/replayManager';
import { StateSetter } from 'domain/dependencies/state/setter';
import Velocity from 'domain/models/velocity';

interface ToggleReplayActivationDependencies {
  isReplaying: boolean;
  stateSetter: StateSetter;
  replayManager: ReplayManager;
  replayVelocity: Velocity;
}

export default function toggleReplayActivation({
  isReplaying,
  stateSetter,
  replayManager,
  replayVelocity,
}: ToggleReplayActivationDependencies) {
  const newReplayState = !isReplaying;
  stateSetter({ isReplaying: newReplayState });
  if (newReplayState) {
    replayManager.startTimer(replayVelocity.updatesPerSecond);
  } else {
    replayManager.endTimer();
  }
}
