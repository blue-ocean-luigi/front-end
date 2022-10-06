import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import IncomingGroupRequests from './IncomingGroupRequests';
import GroupMemberList from '../GroupPageSubcomponents/GroupMemberList';

// TODO: connect to GET requests
function AdminEditMembers({onClose, isOpen, members, memberRequests, page, editing, handleMemberStatus}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <IncomingGroupRequests memberRequests={memberRequests} page={page} editing={editing} />
          <Divider mt={8} mb={4} />
          <GroupMemberList members={members} page={page} editing={editing} handleMemberStatus={handleMemberStatus} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AdminEditMembers;
