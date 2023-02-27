import ChartManager from 'domain/dependencies/managers/chartManager';

interface FillChartDependencies {
  chartManager: ChartManager;
}

export default function fillChart({ chartManager }: FillChartDependencies) {
  chartManager.fillChart();
}
