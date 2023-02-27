import { StateSlice } from 'domain/dependencies/state/state';
import Velocity from 'domain/models/velocity';

interface GetReplayVelocityDependencies {
  state: StateSlice<'replayVelocity'>;
}

export default function getReplayVelocity({
  state,
}: GetReplayVelocityDependencies): Velocity {
  return state.replayVelocity ?? { updatesPerSecond: 1 };
}
