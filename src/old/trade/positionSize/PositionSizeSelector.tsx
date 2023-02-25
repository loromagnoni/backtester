import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

export const PositionSizeSelector = () => {
    return (
        <NumberInput
            defaultValue={1}
            precision={3}
            step={0.01}
            min={0.001}
            max={50}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
