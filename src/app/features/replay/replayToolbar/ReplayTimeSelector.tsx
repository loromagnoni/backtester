import { Input } from '@chakra-ui/react';
import useChangeReplayDate from 'app/hooks/useChangeReplayDate';
import useReplayDate from 'app/hooks/useReplayDate';

export default function ReplayTimeSelector() {
  const replayDate = useReplayDate();
  const changeReplayDate = useChangeReplayDate();
  return (
    <Input
      size="md"
      type="datetime-local"
      w="auto"
      value={replayDate.toISOString()}
      onChange={(e) => changeReplayDate(new Date(e.target.value))}
    />
  );
}
