import getIsReplaying from 'domain/useCase/replay/getIsReplaying';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useIsReplaying() {
  const [state] = useGlobalState();
  return useMemo(
    () => getIsReplaying({ state: { isReplaying: state.isReplaying } }),
    [state.isReplaying]
  );
}
