import useResetChart from 'app/domain/chart/useResetChart';
import { useEffect } from 'react';

export default function useUpdateChartOnLoad() {
  const resetChart = useResetChart();
  useEffect(() => {
    resetChart();
  }, [resetChart]);
}
