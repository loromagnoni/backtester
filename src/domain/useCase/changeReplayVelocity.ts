import ReplayManager from 'domain/interfaces/replayManager';
import { StateSetter } from 'domain/interfaces/setter';
import Velocity from 'domain/interfaces/velocity';

interface ChangeReplayVelocityDependencies {
  stateSetter: StateSetter;
  newVelocity: Velocity;
  replayManager: ReplayManager;
}

export default function changeReplayVelocity({
  stateSetter,
  newVelocity,
  replayManager,
}: ChangeReplayVelocityDependencies) {
  stateSetter({ replayVelocity: newVelocity });
  replayManager.changeVelocity(newVelocity.updatesPerSecond);
}
