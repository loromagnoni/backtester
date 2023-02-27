import ReplayManager from 'domain/dependencies/managers/replayManager';
import { StateSetter } from 'domain/dependencies/state/setter';
import Velocity from 'domain/models/velocity';

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
