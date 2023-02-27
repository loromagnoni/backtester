import { Select } from '@chakra-ui/react';
import useAvailableTimeframes from 'app/hooks/timeframe/useAvailableTimeframes';
import useChangeTimeframe from 'app/hooks/timeframe/useChangeTimeframe';
import useSelectedTimeframe from 'app/hooks/timeframe/useSelectedTimeframe';

export default function TimeframeSelector() {
  const timeframes = useAvailableTimeframes();
  const changeTimeframe = useChangeTimeframe();
  const selectedTimeframe = useSelectedTimeframe();
  return (
    <Select
      placeholder="Select timeframe"
      minW={60}
      variant="outline"
      value={selectedTimeframe.label}
      onChange={(e) => changeTimeframe(e.target.value)}
    >
      {timeframes.map((t) => (
        <option key={t.label} value={t.label}>
          {t.label}
        </option>
      ))}
    </Select>
  );
}
