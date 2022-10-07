import React, { useState, useEffect } from 'react';
import {
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Button,
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

import FriendRequestCard from '../ProfilePage/FriendRequestCard.jsx';

// firstname lastname id picture
function FriendRequests({requests}) {
  console.log(requests)
  const {
    userInfo,
    userGroups,
    userFriends,
    setUserFriends,
    homePosts,
  } = UseContextAll();

  const { isOpen, onOpen, onClose } = useDisclosure();
  let [reqCount, setReqCount] = useState(0);

  useEffect(()=>{
    if (requests.length >= 0) {
      setReqCount(requests.length);
    } else {
      setReqCount(0);
    }
  }, [requests]);

  function handleClose() {
    // console.log("close")
    onClose();
    //call getuserfriends and then use setfriends
    please.getFriendsOfUser(userInfo.id)
      .then((data)=>{
        // console.log("before",userFriends);
        // console.log("data",data.data);
        setUserFriends(data.data);
      })
      .catch((err)=>console.log(err));
  }

  return (
    <>
      <Button onClick={onOpen} color="blue.600">
        Friend Requests: {reqCount}
      </Button>

      <Modal isOpen={isOpen} onClose={()=>handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Active Friend Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="80vh" overflowY="auto">
            {requests && requests.map((req) =>
              <FriendRequestCard request={req} setReqCount={setReqCount} />)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleClose()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FriendRequests;
