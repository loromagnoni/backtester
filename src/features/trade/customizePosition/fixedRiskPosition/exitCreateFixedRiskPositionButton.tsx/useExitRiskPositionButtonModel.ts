import { useAppDispatch, useAppSelector } from 'shared/store';
import { exitCreateFixedRiskPositionMode } from 'shared/store/fixedRiskPositionSlice';

export const useExitRiskPositionButtonModel = () => {
    const isActive = useAppSelector(
        (state) => state.fixedRiskPositionMode.isActive
    );
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(exitCreateFixedRiskPositionMode());
    };
    return {
        isVisible: isActive,
        onClick,
    };
};
