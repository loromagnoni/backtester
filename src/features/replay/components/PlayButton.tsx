import { IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useReplayPlayStatus } from '../hooks/useReplayPlayStatus';
export const PlayButton = () => {
    const [isPlaying, setIsPlaying] = useReplayPlayStatus();
    return (
        <IconButton
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Play"
            icon={isPlaying ? <FaPause /> : <FaPlay />}
        />
    );
};
