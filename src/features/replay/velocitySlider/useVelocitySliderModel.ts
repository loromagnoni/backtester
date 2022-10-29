import { useCallback, useState } from 'react';
import {
    findVelocityOptionByLabel,
    findVelocityOptionByUpdates,
} from '../../../shared/services/replayVelocityService';
import { useReplayVelocity } from '../../../shared/stores/useReplayVelocity';

export const useVelocitySliderModel = () => {
    const [velocity, setVelocity] = useReplayVelocity();
    const [showTooltip, setShowTooltip] = useState(false);

    const sliderDefaultValue = findVelocityOptionByUpdates(velocity).label;
    const onChange = useCallback(
        (l: number) =>
            setVelocity(findVelocityOptionByLabel(l).updatesPerSecond),
        [setVelocity]
    );
    const onMouseEnter = useCallback(() => setShowTooltip(true), []);
    const onMouseLeave = useCallback(() => setShowTooltip(false), []);
    return {
        sliderDefaultValue,
        onChange,
        onMouseEnter,
        onMouseLeave,
        isOpen: showTooltip,
        label: velocity.toString(),
    };
};
