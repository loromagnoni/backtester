import { Box, Flex, HStack } from '@chakra-ui/react';
import { PlayButton } from '../playButton/PlayButton';
import { ReplayTimeSelector } from '../replayTimeSelector/ReplayTimeSelector';
import { VelocitySlider } from '../velocitySlider/VelocitySlider';

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
