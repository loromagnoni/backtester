import ReplayManager from 'domain/interfaces/replayManager';
import { StateSetter } from 'domain/interfaces/setter';
import Velocity from 'domain/interfaces/velocity';

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
