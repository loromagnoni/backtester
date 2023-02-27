import useDependencies from 'app/dependencies/useDependencies';
import toggleReplayActivation from 'domain/useCase/toggleReplayActivation';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useIsReplaying from './useGetIsReplaying';
import useReplayVelocity from './useReplayVelocity';

export default function useToggleReplayActivation() {
  const [, stateSetter] = useGlobalState();
  const { replayManager } = useDependencies();
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
