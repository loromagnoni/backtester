import useDependencies from 'app/dependencies/useDependencies';
import getAvailableTimeframes from 'domain/useCase/getAvailableTimeframes';
import { useMemo } from 'react';

export default function useAvailableTimeframes() {
  const { timeframeRepository } = useDependencies();
  return useMemo(
    () => getAvailableTimeframes({ timeframeRepository }),
    [timeframeRepository]
  );
}
