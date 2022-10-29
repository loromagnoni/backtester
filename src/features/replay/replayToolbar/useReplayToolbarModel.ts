import { useEffect } from 'react';
import { useReplayCallback } from '../../../shared/stores/useReplayCallback';
import { useReplayPlayStatus } from '../../../shared/stores/useReplayPlayStatus';
import { useReplayVelocity } from '../../../shared/stores/useReplayVelocity';

export const useReplayToolbarModel = () => {
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
