import { Input } from '@chakra-ui/react';
import useChangeStartReplayDate from 'app/domain/replay/date/useChangeStartReplayDate';
import useReplayDate from 'app/domain/replay/date/useReplayDate';

export default function ReplayTimeSelector() {
  const replayDate = useReplayDate();
  const changeStartReplayDate = useChangeStartReplayDate();
  return (
    <Input
      size="md"
      type="datetime-local"
      w="auto"
      value={replayDate.toISOString().slice(0, 16)}
      onChange={(e) => changeStartReplayDate(new Date(e.target.value))}
    />
  );
}
