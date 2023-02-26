import useDependencies from 'app/dependencies/useDependencies';
import { useEffect, useRef } from 'react';

export default function useCandleStickChartModel() {
  const ref = useRef<HTMLDivElement>(null);
  const { chartManager } = useDependencies();
  useEffect(() => chartManager.initChart(ref), [chartManager, ref]);
  return { chartContainerRef: ref };
}
