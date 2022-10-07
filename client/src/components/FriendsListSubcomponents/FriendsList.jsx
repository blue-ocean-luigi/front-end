import React, { useState } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';

// TODO: edit the hook to work for page control????

function FriendsList({ friends, isGroupInvite, members }) {
  // console.log(friends);

  return (
    <Box overflow="hidden" width="95%" maxHeight="500px" position="relative">
      <Box align="center" width="105%" overflowY="scroll" maxHeight="500px" paddingRight="15px">
        {friends && friends.map((f) => <Friend key={f.name} friend={f} isGroupInvite={isGroupInvite} members={members} />)}
      </Box>
    </Box>
  );
}

export default FriendsList;
