import getLastCandle from 'domain/useCase/chart/getLastCandle';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store/hooks';

export default function useLastCandle() {
  const [state] = useGlobalState();
  return useMemo(
    () => getLastCandle({ state: { lastCandle: state.lastCandle } }),
    [state.lastCandle]
  );
}
