import { useCallback } from 'react';
import { useReplayPlayStatus } from '../../../shared/stores/useReplayPlayStatus';

export const usePlayButtonModel = () => {
    const [isPlaying, setIsPlaying] = useReplayPlayStatus();
    const onClick = useCallback(() => {
        console.log('pippo');
        setIsPlaying(!isPlaying);
    }, [isPlaying, setIsPlaying]);
    const showPauseIcon = isPlaying;
    return { showPauseIcon, onClick };
};
