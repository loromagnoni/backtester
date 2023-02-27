import changeStartReplayDate from 'domain/useCase/changeStartReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useResetChart from './useResetChart';

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
