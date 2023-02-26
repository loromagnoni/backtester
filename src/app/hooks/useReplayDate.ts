import getReplayDate from 'domain/useCase/getReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useReplayDate(): Date {
  const [state] = useGlobalState();
  return useMemo(
    () => getReplayDate({ state: { replayTimestamp: state.replayTimestamp } }),
    [state.replayTimestamp]
  );
}
