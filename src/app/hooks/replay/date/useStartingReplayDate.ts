import getStartingReplayDate from 'domain/useCase/replay/date/getStartingReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

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
