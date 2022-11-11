import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

export const FixedPositionRiskSelector = () => {
    return (
        <NumberInput
            defaultValue={1}
            precision={1}
            step={0.1}
            min={0.1}
            max={100}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
