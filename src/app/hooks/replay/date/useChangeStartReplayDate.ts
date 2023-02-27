import useResetChart from 'app/hooks/chart/useResetChart';
import changeStartReplayDate from 'domain/useCase/replay/date/changeStartReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useChangeStartReplayDate() {
  const [, stateSetter] = useGlobalState();
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
