import { Box, Flex, HStack } from '@chakra-ui/react';
import {
    PlayButton,
    ReplayTimeSelector,
    VelocitySlider,
} from 'features/replay';

export const ReplayToolbar = () => {
    return (
        <HStack w="full">
            <ReplayTimeSelector />
            <PlayButton />
            <Flex flex={1}>
                <Box px={4} w="full" maxW={370}>
                    <VelocitySlider />
                </Box>
            </Flex>
        </HStack>
    );
};
