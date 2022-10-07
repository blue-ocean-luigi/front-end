import React, { useState } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import Friend from './Friend';
import { UseContextAll } from '../ContextAll';
// TODO: edit the hook to work for page control????

function FriendsList({ friends, isGroupInvite, members}) {
  // console.log(friends);
  const { mainPage } = UseContextAll();

  return (

    <Box align="center">
      {mainPage === 'home' && (
      <Heading mb={1} fontSize="xl">
        Your Friends
      </Heading>
      )}
      {mainPage === 'profile' && (
      <Heading mb={1} fontSize="xl">
        Friends
      </Heading>
      )}
      {friends && friends.map((f) => <Friend key={f.name} friend={f} isGroupInvite={isGroupInvite} members={members}/>)}
    </Box>
  );
}

export default FriendsList;
