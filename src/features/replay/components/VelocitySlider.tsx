import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TiMediaFastForward } from 'react-icons/ti';
import { velocityOptions } from '../data/velocityOption';
import { useReplayVelocity } from '../hooks/useReplayVelocity';
import { useVelocityOptions } from '../hooks/useVelocityOptions';

export const VelocitySlider = () => {
    const [velocity, setVelocity] = useReplayVelocity();
    const [showTooltip, setShowTooltip] = useState(false);
    const { labels, findOptionByLabel, findOptionByUpdates } =
        useVelocityOptions();
    return (
        <Slider
            defaultValue={findOptionByUpdates(velocity).label}
            min={0}
            max={5}
            onChange={(l) => setVelocity(findOptionByLabel(l).updatesPerSecond)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {labels.map((l) => (
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
                isOpen={showTooltip}
                label={`${velocity}`}
            >
                <SliderThumb boxSize={6}>
                    <Box as={TiMediaFastForward} />
                </SliderThumb>
            </Tooltip>
        </Slider>
    );
};
