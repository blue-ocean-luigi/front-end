import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import FriendsList from '../GroupPageSubcomponents/GroupMemberList';

// TODO: add invite button to either FriendsList as a conditionally rendered button
// OR map each individual friend to a new friends list with invite buttons
function AdminEditMembers({onClose, isOpen, members}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit members</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FriendsList members={members} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AdminEditMembers;
