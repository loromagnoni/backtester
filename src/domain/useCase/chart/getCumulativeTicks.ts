import { StateSlice } from 'domain/dependencies/state/state';

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
