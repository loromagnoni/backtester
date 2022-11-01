import { IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { usePlayButtonModel } from './usePlayButtonModel';
export const PlayButton = () => {
    const { onClick, showPauseIcon } = usePlayButtonModel();
    return (
        <IconButton
            onClick={onClick}
            aria-label="Play"
            icon={showPauseIcon ? <FaPause /> : <FaPlay />}
        />
    );
};
