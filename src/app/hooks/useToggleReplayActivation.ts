import toggleReplayActivation from 'domain/useCase/toggleReplayActivation';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useToggleReplayActivation() {
  const [state, stateSetter] = useGlobalState();
  return useCallback(
    () => toggleReplayActivation({ state, stateSetter }),
    [state, stateSetter]
  );
}
