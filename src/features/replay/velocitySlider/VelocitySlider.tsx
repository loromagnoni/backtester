import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Tooltip,
} from '@chakra-ui/react';
import { velocityLabels } from 'shared/services/replayVelocityService';
import { TiMediaFastForward } from 'react-icons/ti';
import { useVelocitySliderModel } from './useVelocitySliderModel';

export const VelocitySlider = () => {
    const {
        sliderDefaultValue,
        onChange,
        onMouseEnter,
        onMouseLeave,
        isOpen,
        label,
    } = useVelocitySliderModel();
    return (
        <Slider
            defaultValue={sliderDefaultValue}
            min={0}
            max={5}
            onChange={onChange}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {velocityLabels.map((l) => (
                <SliderMark key={l} value={l} mt="1" ml="-2.5" fontSize="sm">
                    {l}
                </SliderMark>
            ))}
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
                hasArrow
                color="white"
                placement="top"
                isOpen={isOpen}
                label={label}
            >
                <SliderThumb boxSize={6}>
                    <Box as={TiMediaFastForward} />
                </SliderThumb>
            </Tooltip>
        </Slider>
    );
};
