import { Select } from '@chakra-ui/react';
import useAvailableTimeframes from 'app/hooks/useAvailableTimeframes';
import useChangeTimeframe from 'app/hooks/useChangeTimeframe';

export default function TimeframeSelector() {
  const timeframes = useAvailableTimeframes();
  const changeTimeframe = useChangeTimeframe();
  return (
    <Select
      placeholder="Select timeframe"
      minW={60}
      variant="outline"
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
