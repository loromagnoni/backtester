import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import useChangeReplayVelocity from 'app/hooks/useChangeReplayVelocity';
import { useState } from 'react';
import { TiMediaFastForward } from 'react-icons/ti';
import useVelocityOptions from './useVelocityOptions';

export default function VelocitySlider() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { options, selectedOption, getVelocityFromOption } =
    useVelocityOptions();
  const changeVelocity = useChangeReplayVelocity();
  return (
    <Slider
      min={0}
      max={5}
      onChange={(option) => changeVelocity(getVelocityFromOption(option))}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {options.map(({ label }) => (
        <SliderMark key={label} value={label} mt="1" ml="-2.5" fontSize="sm">
          {label}
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
        label={selectedOption.label}
      >
        <SliderThumb boxSize={6}>
          <Box as={TiMediaFastForward} />
        </SliderThumb>
      </Tooltip>
    </Slider>
  );
}
