import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';

// TODO: edit the hook to work for page control????

function FriendsList({ friends, page }) {
  console.log('this is page: ', page)
  return (
    <Box ml={1} align="center">
      {friends.map((f) => <Friend key={f.name} friend={f} page={page} />)}
    </Box>
  );
}

export default FriendsList;
