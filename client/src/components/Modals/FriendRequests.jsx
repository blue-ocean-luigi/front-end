import React from 'react';
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

import FriendRequestCard from '../ProfilePage/FriendRequestCard.jsx';

function FriendRequests(requests) {
  console.log('//////////////', requests.requests);
  // firstname lastname id picture
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>
        Friend Requests: {requests.requests.length || 0}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Active Friend Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="80vh" overflowY="auto">
            {requests.requests && requests.requests.map((req) =>
            <FriendRequestCard request={req}/>)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FriendRequests;
