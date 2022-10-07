import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';
import { sendInvite } from '../ChatBar';

function Friend({ friend, isGroupInvite, members, closeRequestModal }) {
  const { mainPage, setMainPage, setCurrentUserID, currentGroupID, userInfo} = UseContextAll();
  let friendAlreadyInGroup;
  isGroupInvite ? friendAlreadyInGroup = members.filter(m => m.id === friend.id).length > 0 : friendAlreadyInGroup=false;
  //  if you click friends name and pic => friend profile
  function handleSelect() {
    setCurrentUserID(friend.id);
    setMainPage('profile');
  }
  //  if you click invite button => invite chat message send
  function onInvite(e) {
    console.log('invited friend: ', e);
    sendInvite(friend.id, userInfo.id, currentGroupID);
  }

  return (

    <Box
      boxShadow="sm"
      rounded="lg"
      mb={1}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left" onClick={() => handleSelect()}>
          <Image
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            src={friend.picture ? friend.picture : 'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k'}
            alt={friend.firstname}
            p={1}
          />
          <Box p={1} align="left">
            <Text>
              {`${friend.firstname} ${friend.lastname} `}
            </Text>
          </Box>
        </Flex>
        { mainPage === 'group'
          && !friendAlreadyInGroup
          && (
          <Flex p={1}>
            <Button size="xs" onClick={() => { onInvite(friend); closeRequestModal() }}> Invite </Button>
          </Flex>
          ) }
        { mainPage === 'group'
          && friendAlreadyInGroup
          && (
          <Flex p={1}>
            <Badge size="xs"> Already in group </Badge>
          </Flex>
          ) }
      </HStack>
    </Box>

  );
}

export default Friend;
