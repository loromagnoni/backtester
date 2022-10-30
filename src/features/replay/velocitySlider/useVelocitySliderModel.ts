import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import {
    findVelocityOptionByLabel,
    findVelocityOptionByUpdates,
} from '../../../shared/services/replayVelocityService';
import { changeVelocity } from '../../../shared/store/appSlice';

export const useVelocitySliderModel = () => {
    const velocity = useAppSelector((state) => state.app.value.replayVelocity);
    const dispatch = useAppDispatch();
    const [showTooltip, setShowTooltip] = useState(false);

    const sliderDefaultValue = findVelocityOptionByUpdates(velocity).label;
    const onChange = useCallback(
        (l: number) =>
            dispatch(
                changeVelocity(findVelocityOptionByLabel(l).updatesPerSecond)
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
