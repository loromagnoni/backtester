import getLastCandle from 'domain/useCase/getLastCandle';
import { useMemo } from 'react';
import { useGlobalState } from 'shared/store';

export default function useLastCandle() {
  const [state] = useGlobalState();
  return useMemo(
    () => getLastCandle({ state: { lastCandle: state.lastCandle } }),
    [state.lastCandle]
  );
}
