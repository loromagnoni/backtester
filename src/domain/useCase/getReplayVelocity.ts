import State from 'domain/interfaces/state';
import Velocity from 'domain/interfaces/velocity';

interface GetReplayVelocityDependencies {
  state: State;
}

export default function getReplayVelocity({
  state,
}: GetReplayVelocityDependencies): Velocity {
  return state.replayVelocity ?? { updatesPerSecond: 1 };
}
