import useResetChart from 'app/hooks/useResetChart';
import { useEffect } from 'react';

export default function useUpdateChartOnLoad() {
  const resetChart = useResetChart();
  useEffect(() => {
    resetChart();
  }, [resetChart]);
}
