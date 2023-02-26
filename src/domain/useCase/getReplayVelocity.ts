import { StateSlice } from 'domain/interfaces/state';
import Velocity from 'domain/interfaces/velocity';

interface GetReplayVelocityDependencies {
  state: StateSlice<'replayVelocity'>;
}

export default function getReplayVelocity({
  state,
}: GetReplayVelocityDependencies): Velocity {
  return state.replayVelocity ?? { updatesPerSecond: 1 };
}
