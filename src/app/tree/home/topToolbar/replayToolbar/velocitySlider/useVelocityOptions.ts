import useAvailableVelocities from 'app/domain/replay/velocity/useAvailableVelocities';
import useReplayVelocity from 'app/domain/replay/velocity/useReplayVelocity';
import { useCallback, useMemo } from 'react';

export default function useVelocityOptions() {
  const velocities = useAvailableVelocities();
  const velocity = useReplayVelocity();
  const options = velocities.map((v, i) => ({ label: i, velocity: v }));
  const selectedOption =
    options.find((o) => o.velocity === velocity) ?? options[0];
  const getVelocityFromOption = useCallback(
    (label: number) => options.find((o) => o.label === label)?.velocity!,
    [options]
  );
  return useMemo(
    () => ({
      selectedOption,
      options,
      getVelocityFromOption,
    }),
    [getVelocityFromOption, options, selectedOption]
  );
}
