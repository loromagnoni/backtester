import { useEffect } from 'react';
import { useReplayCallback } from './useReplayCallback';
import { useReplayPlayStatus } from './useReplayPlayStatus';
import { useReplayVelocity } from './useReplayVelocity';

export const useTimeReplay = () => {
    const [isPlaying, _] = useReplayPlayStatus();
    const [callbackContainer, __] = useReplayCallback();
    const [velocity, ___] = useReplayVelocity();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && velocity !== 0) {
            interval = setInterval(() => {
                callbackContainer.callback();
            }, 1000 / velocity);
        }
        return () => clearInterval(interval);
    }, [callbackContainer, isPlaying, velocity]);
};
