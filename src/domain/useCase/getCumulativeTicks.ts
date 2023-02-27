import { StateSlice } from 'domain/interfaces/state';

interface GetCumulativeTicksDependencies {
  state: StateSlice<'cumulativeTicks'>;
}

export default function getCumulativeTicks({
  state,
}: GetCumulativeTicksDependencies) {
  if (typeof state.cumulativeTicks !== 'undefined')
    return state.cumulativeTicks;
  return 0;
}
