import useDependencies from 'app/dependencies/useDependencies';
import changeTimeframe from 'domain/useCase/changeTimeframe';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useUpdateChart from './useUpdateChart';

export default function useChangeTimeframe() {
  const [, stateSetter] = useGlobalState();
  const { timeframeRepository } = useDependencies();
  const updateChart = useUpdateChart();
  return useCallback(
    (newTimeframeLabel: string) =>
      changeTimeframe({
        stateSetter,
        newTimeframeLabel,
        timeframeRepository,
        updateChart,
      }),
    [stateSetter, timeframeRepository, updateChart]
  );
}
