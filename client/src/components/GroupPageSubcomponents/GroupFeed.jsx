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
      <Box position="absolute" w="100%" align="center" bg="orange">
        <Box>
          This is where group events and posts go
        </Box>
        <Box>
          This is where group events and posts go
        </Box>
        <Box>
          This is where group events and posts go
        </Box>
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
