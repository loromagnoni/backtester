import useDependencies from 'app/dependencies/useDependencies';
import fillChart from 'domain/useCase/chart/fillChart';
import { useCallback } from 'react';

export default function useFillChart() {
  const { chartManager } = useDependencies();
  return useCallback(() => fillChart({ chartManager }), [chartManager]);
}
