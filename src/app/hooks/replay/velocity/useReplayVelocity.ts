import getReplayVelocity from 'domain/useCase/replay/velocity/getReplayVelocity';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useReplayVelocity() {
  const [state] = useGlobalState();
  return useMemo(
    () =>
      getReplayVelocity({ state: { replayVelocity: state.replayVelocity } }),
    [state.replayVelocity]
  );
}
