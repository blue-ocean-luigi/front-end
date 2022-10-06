import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';

function Friend({ friend }) {
  console.log(friend);
  const { mainPage, setMainPage, setCurrentUserID } = UseContextAll();

  //  if you click friends name and pic => friend profile
  function handleSelect() {
    setCurrentUserID(friend.id);
    setMainPage('profile');
  }
  //  if you click invite button => invite chat message send
  function onInvite(e) {
    console.log('invited friend: ', e);
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
            src={friend.picture}
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
