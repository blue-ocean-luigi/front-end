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
      <Flex mt={1} justifyContent="center" bg="orange">
        <VStack>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
        </VStack>
      </Flex>
      <Flex mt="auto" justifyContent="flex-end" bg="magenta">
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
