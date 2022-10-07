import React, { useState } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';

// TODO: edit the hook to work for page control????

function FriendsList({ friends, isGroupInvite, members}) {
  // console.log(friends);

  return (
    <Box align="center">
      {friends && friends.map((f) => <Friend key={f.name} friend={f} isGroupInvite={isGroupInvite} members={members}/>)}
    </Box>
  );
}

export default FriendsList;
