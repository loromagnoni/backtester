import { Input } from '@chakra-ui/react';
import useChangeReplayDate from 'app/hooks/useChangeReplayDate';
import useStartingReplayDate from 'app/hooks/useStartingReplayDate';

export default function ReplayTimeSelector() {
  const replayDate = useStartingReplayDate();
  const changeReplayDate = useChangeReplayDate();
  return (
    <Input
      size="md"
      type="datetime-local"
      w="auto"
      value={replayDate.toISOString().slice(0, 16)}
      onChange={(e) => changeReplayDate(new Date(e.target.value))}
    />
  );
}
