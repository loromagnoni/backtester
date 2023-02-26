import changeReplayDate from 'domain/useCase/changeReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useResetChart from './useResetChart';

export default function useChangeReplayDate() {
  const [, stateSetter] = useGlobalState();
  const resetChart = useResetChart();
  return useCallback(
    (newReplayDate: Date) =>
      changeReplayDate({
        newReplayDate,
        stateSetter,
        resetChart,
      }),
    [stateSetter, resetChart]
  );
}
