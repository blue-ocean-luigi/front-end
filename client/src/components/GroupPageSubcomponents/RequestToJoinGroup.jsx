import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  FormHelperText,
  useDisclosure,
  Button,
  Badge,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';
import { please } from '../../request';
// TODO: add invite button to either FriendsList as a conditionally rendered button
// OR map each individual friend to a new friends list with invite buttons
function RequestToJoinGroup({onClose, isOpen, groupInfo}) {
  const {userID, currentGroupID} = UseContextAll();
  const [postContent, setPostContent] = useState('');


  function handleSubmit() {
    please.requestToJoinGroup(currentGroupID, userID, postContent)
      .then((response) => {
        setRequested(true);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request to join group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Why do you want to join?</FormLabel>
            <Textarea onChange={(e) => { setPostContent(e.target.value); }} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="gray" mr={3} onClick={() => { handleSubmit(); }}>
            Send request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RequestToJoinGroup;
