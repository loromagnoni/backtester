import useDependencies from 'app/dependencies/useDependencies';
import Velocity from 'domain/models/velocity';
import changeReplayVelocity from 'domain/useCase/replay/velocity/changeReplayVelocity';
import { useCallback } from 'react';

export default function useChangeReplayVelocity() {
  const { replayManager, stateSetter } = useDependencies();
  return useCallback(
    (newVelocity: Velocity) =>
      changeReplayVelocity({
        newVelocity,
        replayManager,
        stateSetter,
      }),
    [replayManager, stateSetter]
  );
}
