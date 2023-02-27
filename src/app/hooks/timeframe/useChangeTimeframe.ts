import useDependencies from 'app/dependencies/useDependencies';
import changeTimeframe from 'domain/useCase/timeframe/changeTimeframe';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store/hooks';
import useResetChart from '../chart/useResetChart';

export default function useChangeTimeframe() {
  const [, stateSetter] = useGlobalState();
  const { timeframeRepository } = useDependencies();
  const resetChart = useResetChart();
  return useCallback(
    (newTimeframeLabel: string) =>
      changeTimeframe({
        stateSetter,
        newTimeframeLabel,
        timeframeRepository,
        resetChart,
      }),
    [stateSetter, timeframeRepository, resetChart]
  );
}
