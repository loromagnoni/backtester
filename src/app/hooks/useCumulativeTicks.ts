import getCumulativeTicks from 'domain/useCase/getCumulativeTicks';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useCumulativeTicks() {
  const [state] = useGlobalState();
  return useMemo(
    () =>
      getCumulativeTicks({ state: { cumulativeTicks: state.cumulativeTicks } }),
    [state.cumulativeTicks]
  );
}
