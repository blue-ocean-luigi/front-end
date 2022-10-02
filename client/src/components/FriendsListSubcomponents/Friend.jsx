import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';

function Friend({ friend }) {
  return (
    <Box bg="brown">
      <Flex justifyContent="left">
        <Image
          borderRadius="full"
          boxSize="15%"
          src={ friend.profilePicture }
          alt={ friend.name }
          p={1}
        />
        <Box p={1} align="left">
          <Text>
            { friend.name }
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Friend;
