import { useCallback, useState } from 'react';
import {
    findVelocityOptionByLabel,
    findVelocityOptionByUpdates,
} from 'shared/services/replayVelocityService';
import {
    setReplayVelocity,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';

export const useVelocitySliderModel = () => {
    const velocity = useAppSelector((state) => state.app.replayVelocity);
    const dispatch = useAppDispatch();
    const [showTooltip, setShowTooltip] = useState(false);

    const sliderDefaultValue = findVelocityOptionByUpdates(velocity).label;
    const onChange = useCallback(
        (l: number) =>
            dispatch(
                setReplayVelocity(findVelocityOptionByLabel(l).updatesPerSecond)
            ),
        [dispatch]
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
