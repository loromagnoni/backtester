import { IconButton } from '@chakra-ui/react';
import useIsReplaying from 'app/hooks/replay/useGetIsReplaying';
import useToggleReplayActivation from 'app/hooks/replay/useToggleReplayActivation';
import { FaPause, FaPlay } from 'react-icons/fa';

export default function PlayButton() {
  const isReplaying = useIsReplaying();
  const toggleReplay = useToggleReplayActivation();
  return (
    <IconButton
      onClick={toggleReplay}
      aria-label="Play"
      icon={isReplaying ? <FaPause /> : <FaPlay />}
    />
  );
}
