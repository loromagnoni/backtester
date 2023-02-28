import useDependencies from 'app/dependencies/useDependencies';
import getStartingReplayDate from 'domain/useCase/replay/date/getStartingReplayDate';
import { useMemo } from 'react';

export default function useStartingReplayDate() {
  const { state, stateSetter } = useDependencies();
  return useMemo(
    () =>
      getStartingReplayDate({
        state: {
          startingReplayTimestamp: state.startingReplayTimestamp,
        },
        stateSetter,
      }),
    [state.startingReplayTimestamp, stateSetter]
  );
}
