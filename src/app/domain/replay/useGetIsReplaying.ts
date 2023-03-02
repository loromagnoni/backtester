import useDependencies from 'app/dependencies/useDependencies';
import getIsReplaying from 'domain/useCase/replay/getIsReplaying';
import { useMemo } from 'react';

export default function useIsReplaying() {
  const { state } = useDependencies();
  return useMemo(
    () => getIsReplaying({ state: { isReplaying: state.isReplaying } }),
    [state.isReplaying]
  );
}
