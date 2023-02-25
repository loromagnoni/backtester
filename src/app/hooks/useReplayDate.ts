import getCurrentReplayDate from 'domain/useCase/getReplayDate';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useReplayDate() {
  const [state] = useGlobalState();
  return useMemo(() => getCurrentReplayDate({ state }), [state]);
}
