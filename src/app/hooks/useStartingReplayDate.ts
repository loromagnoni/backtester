import getStartingReplayDate from 'domain/useCase/getStartingReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useStartingReplayDate() {
  const [state, stateSetter] = useGlobalState();
  return useMemo(
    () =>
      getStartingReplayDate({
        state: { startingReplayTimestamp: state.startingReplayTimestamp },
        stateSetter,
      }),
    [state.startingReplayTimestamp, stateSetter]
  );
}
