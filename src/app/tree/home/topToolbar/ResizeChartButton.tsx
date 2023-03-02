import { IconButton } from '@chakra-ui/react';
import useFillChart from 'app/domain/chart/useFillChart';
import { FaExpandArrowsAlt } from 'react-icons/fa';

export default function ResizeChartButton() {
  const fillChart = useFillChart();
  return (
    <IconButton
      onClick={fillChart}
      aria-label="Reset chart"
      icon={<FaExpandArrowsAlt />}
    />
  );
}
