import useDependencies from 'app/dependencies/useDependencies';
import getSelectedTimeframe from 'domain/useCase/getSelectedTimeframe';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useSelectedTimeframe() {
  const [state, stateSetter] = useGlobalState();
  const { timeframeRepository } = useDependencies();
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
