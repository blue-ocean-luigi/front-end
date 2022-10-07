import React, { useState } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';
import { UseContextAll } from '../ContextAll';
// TODO: edit the hook to work for page control????

function FriendsList({ friends, isGroupInvite, members, closeRequestModal }) {
  // console.log(friends);
  const { mainPage } = UseContextAll();

  return (
    <>
      {mainPage === 'home' && (
        <Box overflow="hidden" width="95%" maxHeight="500px" position="relative">
          <Box align="center" width="105%" overflowY="scroll" maxHeight="470px" paddingRight="15px">
            {friends && friends.map((f) => <Friend key={f.name} friend={f} isGroupInvite={isGroupInvite} members={members} />)}
          </Box>
        </Box>
      )}
      {(mainPage === 'profile' || mainPage === 'group') && (
      <Box align="center">
        <Heading mb={1} fontSize="xl">
          Friends
        </Heading>
        {friends && friends.map((f) => <Friend key={f.name} friend={f} closeRequestModal={closeRequestModal} isGroupInvite={isGroupInvite} members={members}/>)}
      </Box>
      )}
    </>
  );
}

export default FriendsList;
