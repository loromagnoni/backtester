import Velocity from 'domain/interfaces/velocity';
import changeReplayVelocity from 'domain/useCase/changeReplayVelocity';
import { useCallback } from 'react';
import { useGlobalState } from 'shared/store';

export default function useChangeReplayVelocity() {
  const [, stateSetter] = useGlobalState();
  return useCallback(
    (newVelocity: Velocity) =>
      changeReplayVelocity({ newVelocity, stateSetter }),
    [stateSetter]
  );
}
