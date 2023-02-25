import changeReplayDate from 'domain/useCase/changeReplayDate';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeReplayDate() {
  const [, stateSetter] = useGlobalState();
  return useCallback(
    (newReplayDate: Date) => changeReplayDate({ newReplayDate, stateSetter }),
    [stateSetter]
  );
}
