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
function AdminEditMembers({onClose, isOpen, members, memberRequests, editing, handleMemberStatus, isGroupAdmin}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <IncomingGroupRequests memberRequests={memberRequests} editing={editing} />
          <Divider mt={8} mb={4} />
          <GroupMemberList members={members} editing={editing} handleMemberStatus={handleMemberStatus} isGroupAdmin={isGroupAdmin} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AdminEditMembers;
