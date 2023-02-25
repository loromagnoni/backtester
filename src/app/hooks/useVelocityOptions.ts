import useDependencies from 'app/dependencies/useDependencies';
import getAvailableVelocities from 'domain/useCase/getAvailableVelocities';
import { useMemo } from 'react';

export default function useAvailableVelocities() {
  const { velocityRepository } = useDependencies();
  return useMemo(
    () => getAvailableVelocities({ velocityRepository }),
    [velocityRepository]
  );
}
