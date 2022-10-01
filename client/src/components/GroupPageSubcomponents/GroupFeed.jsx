import React from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';

function GroupFeed() {
  return (
    <Box>
      <Flex justifyContent="center">
        <Text>This is where group events and posts go</Text>
      </Flex>
      <Flex justifyContent="right">
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
