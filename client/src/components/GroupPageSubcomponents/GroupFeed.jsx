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
      <Flex justifyContent="center">
        <VStack>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
          <Text>This is where group events and posts go</Text>
        </VStack>
      </Flex>
      <Flex justifyContent="flex-end">
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
