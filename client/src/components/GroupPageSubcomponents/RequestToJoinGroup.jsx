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
} from '@chakra-ui/react';
// TODO: add invite button to either FriendsList as a conditionally rendered button
// OR map each individual friend to a new friends list with invite buttons
function requestToJoinGroup({onClose, isOpen, groupInfo}) {

  const [postContent, setPostContent] = useState('');

  function handleSubmit() {
    const formBody = {
      user_id: userID,
      group_id: groupID,
      content: postContent,
    };
    console.log(formBody);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join {groupInfo.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Why do you want to join?</FormLabel>
            <Textarea onChange={(e) => { setPostContent(e.target.value); }} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => { handleSubmit(); }}>
            Send request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default requestToJoinGroup;
