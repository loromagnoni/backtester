import useDependencies from 'app/dependencies/useDependencies';
import changeTimeframe from 'domain/useCase/changeTimeframe';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeTimeframe() {
  const [, stateSetter] = useGlobalState();
  const { timeframeRepository } = useDependencies();
  return useCallback(
    (newTimeframeLabel: string) =>
      changeTimeframe({ stateSetter, newTimeframeLabel, timeframeRepository }),
    [stateSetter, timeframeRepository]
  );
}
