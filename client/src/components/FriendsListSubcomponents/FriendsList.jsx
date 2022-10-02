import React from 'react';
import {
  Box,
} from '@chakra-ui/react';

function FriendsList() {
  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Friends
      </Heading>
      {members.map((m) => <GroupMember key={m.name} member={m} />)}
    </Box>
  );
}

export default FriendsList;
