import getReplayDate from 'domain/useCase/replay/date/getReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useReplayDate(): Date {
  const [state] = useGlobalState();
  return useMemo(
    () => getReplayDate({ state: { replayTimestamp: state.replayTimestamp } }),
    [state.replayTimestamp]
  );
}
