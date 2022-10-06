import React from 'react';
import {
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';
import { please } from '../../request.jsx'

function FriendRequestCard({request}) {
  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
  } = UseContextAll();

  console.log(request);

  function acceptReq(e, id) {
    e.preventDefault();
    console.log("user: ", userInfo.id, "requester: ",id);
    // please.acceptFriend(requester_id, userid)
    please.acceptFriend(id, userInfo.id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function denyReq(e, id) {
    e.preventDefault();
    console.log("user: ", userInfo.id, "requester: ", id);
    // please.removeFriend(user_id, friend_id)
    please.removeFriend(userInfo.id, id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" h="8vw" borderBottom="1px solid lightgray" padding="10px 0px">
      <Image src={request.picture} boxSize="5vw" borderRadius="full" />
      <Text fontSize="1.2em" transform="translateX(-20%)">{`${request.firstname} ${request.lastname}`}</Text>
      <Flex flexDirection="column" justifyContent="space-evenly" h="100%">
        <Button h="1.2em" colorScheme="green" onClick={(e)=>acceptReq(e, request.id)}>Accept</Button>
        <Button h="1.2em" colorScheme="red" onClick={(e)=>denyReq(e, request.id)}>Deny</Button>
      </Flex>
    </Flex>
  );
}

export default FriendRequestCard;