import useDependencies from 'app/dependencies/useDependencies';
import getReplayDate from 'domain/useCase/replay/date/getReplayDate';
import { useMemo } from 'react';

export default function useReplayDate(): Date {
  const { state } = useDependencies();
  return useMemo(
    () =>
      getReplayDate({
        state: { replayTimestamp: state.replayTimestamp },
      }),
    [state.replayTimestamp]
  );
}
