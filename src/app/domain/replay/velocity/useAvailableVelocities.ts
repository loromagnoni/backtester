import useDependencies from 'app/dependencies/useDependencies';
import getAvailableVelocities from 'domain/useCase/replay/velocity/getAvailableVelocities';
import { useMemo } from 'react';

export default function useAvailableVelocities() {
  const { velocityRepository } = useDependencies();
  return useMemo(
    () => getAvailableVelocities({ velocityRepository }),
    [velocityRepository]
  );
}
