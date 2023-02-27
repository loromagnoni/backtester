import useDependencies from 'app/dependencies/useDependencies';
import changeTimeframe from 'domain/useCase/timeframe/changeTimeframe';
import { useCallback } from 'react';
import useResetChart from '../chart/useResetChart';

export default function useChangeTimeframe() {
  const { timeframeRepository, stateSetter } = useDependencies();
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
