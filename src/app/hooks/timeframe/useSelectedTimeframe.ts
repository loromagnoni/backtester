import useDependencies from 'app/dependencies/useDependencies';
import getSelectedTimeframe from 'domain/useCase/timeframe/getSelectedTimeframe';
import { useMemo } from 'react';

export default function useSelectedTimeframe() {
  const { timeframeRepository, state, stateSetter } = useDependencies();
  return useMemo(
    () =>
      getSelectedTimeframe({
        state: { timeframeSelected: state.timeframeSelected },
        stateSetter,
        timeframeRepository,
      }),
    [state.timeframeSelected, stateSetter, timeframeRepository]
  );
}
