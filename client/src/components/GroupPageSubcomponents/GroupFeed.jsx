import React from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react';

function GroupFeed() {
  return (
    <Box>
      <Box position="absolute" justifyContent="center" bg="orange">
        <VStack>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
        </VStack>
      </Box>
      <Flex position="absolute" bottom={0} w="100%" justifyContent="flex-end" bg="magenta">
        <Button variant="ghost">
          New Event
        </Button>
        <Button variant="ghost">
          New Post
        </Button>
      </Flex>
    </Box>
  );
}

export default GroupFeed;
