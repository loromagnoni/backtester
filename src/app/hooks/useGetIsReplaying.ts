import getIsReplaying from 'domain/useCase/getIsReplaying';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useIsReplaying() {
  const [state] = useGlobalState();
  return useMemo(
    () => getIsReplaying({ state: { isReplaying: state.isReplaying } }),
    [state.isReplaying]
  );
}
