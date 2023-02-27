import getCumulativeTicks from 'domain/useCase/chart/getCumulativeTicks';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useCumulativeTicks() {
  const [state] = useGlobalState();
  return useMemo(
    () =>
      getCumulativeTicks({ state: { cumulativeTicks: state.cumulativeTicks } }),
    [state.cumulativeTicks]
  );
}
