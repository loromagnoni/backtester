import { Box, Flex, HStack } from '@chakra-ui/react';
import { ReplayTimeSelector } from '../replayTimeSelector/ReplayTimeSelector';
import { VelocitySlider } from '../velocitySlider/VelocitySlider';
import { PlayButton } from '../playButton/PlayButton';
import { useReplayToolbarModel } from './useReplayToolbarModel';

export const ReplayToolbar = () => {
    useReplayToolbarModel();
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
