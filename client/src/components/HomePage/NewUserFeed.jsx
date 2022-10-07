import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function NewUserFeed() {
  return (
    <Box>
      <Box position="absolute" w="70%" align="center">
        <Text fontSize="2xl">
          Uh Oh! You haven't joined any groups yet :(
        </Text>
        <Text fontSize="xl">
          Use the search bar to find groups and friends to start building your community.
        </Text>
      </Box>
    </Box>
  );
}

export default NewUserFeed;
