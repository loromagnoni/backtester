import getReplayVelocity from 'domain/useCase/getReplayVelocity';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useReplayVelocity() {
  const [state] = useGlobalState();
  return useMemo(() => getReplayVelocity({ state }), [state]);
}
