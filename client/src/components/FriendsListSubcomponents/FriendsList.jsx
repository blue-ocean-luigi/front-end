import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';

function FriendsList({ friends }) {
  return (
    <Box align="center">
      {friends.map((f) => <Friend key={f.name} friend={f} />)}
    </Box>
  );
}

export default FriendsList;
