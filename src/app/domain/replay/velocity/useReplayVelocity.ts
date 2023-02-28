import useDependencies from 'app/dependencies/useDependencies';
import getReplayVelocity from 'domain/useCase/replay/velocity/getReplayVelocity';
import { useMemo } from 'react';

export default function useReplayVelocity() {
  const { state } = useDependencies();
  return useMemo(
    () =>
      getReplayVelocity({ state: { replayVelocity: state.replayVelocity } }),
    [state.replayVelocity]
  );
}
