import useDependencies from 'app/tree/dependencies/useDependencies';
import getLastCandle from 'domain/useCase/chart/getLastCandle';
import { useMemo } from 'react';

export default function useLastCandle() {
  const { state } = useDependencies();
  return useMemo(
    () => getLastCandle({ state: { lastCandle: state.lastCandle } }),
    [state.lastCandle]
  );
}
