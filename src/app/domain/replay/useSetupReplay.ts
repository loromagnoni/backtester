import useDependencies from 'app/dependencies/useDependencies';
import setupReplay from 'domain/useCase/replay/setupReplay';
import { useCallback } from 'react';
import useForwardReplay from './useForwardReplay';

export default function useSetupReplay() {
  const { replayManager } = useDependencies();
  const forwardReplay = useForwardReplay();
  return useCallback(
    () => setupReplay({ replayManager, forwardReplay }),
    [forwardReplay, replayManager]
  );
}
