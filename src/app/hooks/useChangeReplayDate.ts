import changeReplayDate from 'domain/useCase/changeReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useUpdateChart from './useUpdateChart';

export default function useChangeReplayDate() {
  const [, stateSetter] = useGlobalState();
  const updateChart = useUpdateChart();
  return useCallback(
    (newReplayDate: Date) =>
      changeReplayDate({
        newReplayDate,
        stateSetter,
        updateChart,
      }),
    [stateSetter, updateChart]
  );
}
