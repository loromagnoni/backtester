import getCurrentReplayDate from 'domain/useCase/getReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useReplayDate() {
  const [state, stateSetter] = useGlobalState();
  return useMemo(
    () =>
      getCurrentReplayDate({
        state: { replayTimestamp: state.replayTimestamp },
        stateSetter,
      }),
    [state.replayTimestamp, stateSetter]
  );
}
