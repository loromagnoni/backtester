import useUpdateChart from 'app/hooks/useUpdateChart';
import { useEffect } from 'react';

export default function useUpdateChartOnLoad() {
  const updateChart = useUpdateChart();
  useEffect(() => {
    updateChart();
  }, [updateChart]);
}
