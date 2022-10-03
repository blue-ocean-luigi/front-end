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
import GroupMemberList from '../GroupPageSubcomponents/GroupMemberList';
import IncomingGroupRequests from '../GroupPageSubcomponents/IncomingGroupRequests';

// TODO: connect to GET requests
function AdminEditMembers({onClose, isOpen, members, memberRequests, page, editing}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <IncomingGroupRequests memberRequests={memberRequests} page={page} editing={editing} />
          <GroupMemberList members={members} page={page} editing={editing} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AdminEditMembers;
