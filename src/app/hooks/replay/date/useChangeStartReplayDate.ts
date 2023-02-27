import useDependencies from 'app/dependencies/useDependencies';
import useResetChart from 'app/hooks/chart/useResetChart';
import changeStartReplayDate from 'domain/useCase/replay/date/changeStartReplayDate';
import { useCallback } from 'react';

export default function useChangeStartReplayDate() {
  const { stateSetter } = useDependencies();
  const resetChart = useResetChart();
  return useCallback(
    (newReplayDate: Date) =>
      changeStartReplayDate({
        newReplayDate,
        stateSetter,
        resetChart,
      }),
    [stateSetter, resetChart]
  );
}
