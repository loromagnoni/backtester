import { StateSetter } from 'domain/interfaces/setter';
import Velocity from 'domain/interfaces/velocity';

interface ChangeReplayVelocityDependencies {
  stateSetter: StateSetter;
  newVelocity: Velocity;
}

export default function changeReplayVelocity({
  stateSetter,
  newVelocity,
}: ChangeReplayVelocityDependencies) {
  stateSetter({ replayVelocity: newVelocity });
}
