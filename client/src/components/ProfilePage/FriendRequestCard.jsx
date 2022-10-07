import React, { useState } from 'react';
import {
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Button,
  Icon,
} from '@chakra-ui/react';
import { MdDone, MdThumbUp, MdThumbDown } from 'react-icons/md'
import { UseContextAll } from '../ContextAll';
import { please } from '../../request.jsx'

function FriendRequestCard({request, setReqCount}) {
  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
  } = UseContextAll();

  let [replied, setReplied] = useState(false);
  let [accepted, setAccepted] = useState(false);

  function acceptReq(e, id) {
    e.preventDefault();
    console.log("user: ", userInfo.id, "requester: ",id);
    please.acceptFriend(id, userInfo.id)
      .then((data) => {
        setReplied(true);
        setAccepted(true);
        setReqCount((count) => count - 1);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function denyReq(e, id) {
    e.preventDefault();
    console.log("user: ", userInfo.id, "requester: ", id);
    please.removeFriend(userInfo.id, id)
      .then((data) => {
        setReplied(true);
        setReqCount((count) => count - 1);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" h="8vw" borderBottom="1px solid lightgray" padding="10px 0px" position="relative">

      <Image src={request.picture} boxSize="5vw" borderRadius="full" objectFit="cover" />
      <Text fontSize="1.2em" position="absolute" left="6vw" top="calc(((100% - 1.2em) / 2 ) - 8)">{`${request.firstname} ${request.lastname}`}</Text>
      <Box h="100%">
        {replied ?
          ( accepted ? <Icon as={MdThumbUp} boxSize="2em" position="absolute" top="calc((100% - 2em) / 2)" right="5%" color="blue.500">done</Icon> : <Icon as={MdThumbDown} boxSize="2em" position="absolute" top="calc((100% - 2em) / 2)" right="5%" color="red.500"></Icon>) :
          (
            <Flex flexDirection="column" justifyContent="space-evenly" h="100%">
              <Button
                h="1.2em"
                colorScheme="green"
                onClick={(e) => acceptReq(e, request.id)}
              >
                Accept
              </Button>
              <Button
                h="1.2em"
                colorScheme="red"
                onClick={(e) => denyReq(e, request.id)}
              >
                Deny
              </Button>
            </Flex>
          )}
      </Box>
    </Flex>
  );
}

export default FriendRequestCard;