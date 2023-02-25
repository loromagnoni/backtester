import { Box, Flex, HStack } from '@chakra-ui/react';
import PlayButton from './PlayButton';
import ReplayTimeSelector from './ReplayTimeSelector';
import VelocitySlider from './velocitySlider/VelocitySlider';

export default function ReplayToolbar() {
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
}
