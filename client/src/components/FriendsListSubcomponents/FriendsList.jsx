import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';

function FriendsList({ friends }) {
  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Friends
      </Heading>
      {friends.map((f) => <Friend key={f.name} friend={f} />)}
    </Box>
  );
}

export default FriendsList;
