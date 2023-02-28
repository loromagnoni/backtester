import useDependencies from 'app/dependencies/useDependencies';
import toggleReplayActivation from 'domain/useCase/replay/toggleReplayActivation';
import { useCallback } from 'react';
import useIsReplaying from './useGetIsReplaying';
import useReplayVelocity from './velocity/useReplayVelocity';

export default function useToggleReplayActivation() {
  const { replayManager, stateSetter } = useDependencies();
  const isReplaying = useIsReplaying();
  const replayVelocity = useReplayVelocity();
  return useCallback(
    () =>
      toggleReplayActivation({
        isReplaying,
        replayVelocity,
        stateSetter,
        replayManager,
      }),
    [isReplaying, replayManager, replayVelocity, stateSetter]
  );
}
