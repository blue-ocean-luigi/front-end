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

function FriendRequestCard({request}) {
  console.log(request);

  return (
    <Flex justifyContent="space-between" alignItems="center" h="8vw" borderBottom="1px solid gray" padding="10px 0px">
      <Image src={request.picture} boxSize="5vw" borderRadius="full" />
      <Text fontSize="1.2em" transform="translateX(-20%)">{`${request.firstname} ${request.lastname}`}</Text>
      <Flex flexDirection="column" justifyContent="space-evenly" h="100%">
        <Button h="1.2em" colorScheme="green">Accept</Button>
        <Button h="1.2em" colorScheme="red">Deny</Button>
      </Flex>
    </Flex>
  );
}

export default FriendRequestCard;