import { useCandleStickChart } from '../hooks/useCandleStickChart';
import { Chart } from './Chart';

export const CandleStickChart = () => {
    const { serieProvider } = useCandleStickChart();
    return <Chart serieProvider={serieProvider} />;
};
