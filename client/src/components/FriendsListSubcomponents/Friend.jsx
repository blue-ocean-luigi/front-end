import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';

function onInvite(e) {
  console.log('invited friend: ', e);
}

function Friend({ friend, page }) {
  return (
    <Box
      boxShadow="sm"
      rounded="lg"
      mb={1}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          <Image
            borderRadius="full"
            boxSize="80px"
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
        { page === 'group'
          && (
          <Flex p={1}>
            <Button size="xs" onClick={() => onInvite(friend)}> Invite </Button>
          </Flex>
          ) }
      </HStack>
    </Box>
  );
}

export default Friend;
