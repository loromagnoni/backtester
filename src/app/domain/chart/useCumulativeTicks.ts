import useDependencies from 'app/dependencies/useDependencies';
import getCumulativeTicks from 'domain/useCase/chart/getCumulativeTicks';
import { useMemo } from 'react';

export default function useCumulativeTicks() {
  const { state } = useDependencies();
  return useMemo(
    () =>
      getCumulativeTicks({
        state: { cumulativeTicks: state.cumulativeTicks },
      }),
    [state.cumulativeTicks]
  );
}
