import useDependencies from 'app/dependencies/useDependencies';
import toggleReplayActivation from 'domain/useCase/toggleReplayActivation';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';
import useIsReplaying from './useGetIsReplaying';

export default function useToggleReplayActivation() {
  const [, stateSetter] = useGlobalState();
  const { replayManager } = useDependencies();
  const isReplaying = useIsReplaying();
  return useCallback(
    () => toggleReplayActivation({ isReplaying, stateSetter, replayManager }),
    [isReplaying, replayManager, stateSetter]
  );
}
