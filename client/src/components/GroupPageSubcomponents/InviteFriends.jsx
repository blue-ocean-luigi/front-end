import React, { useState } from 'react';
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
import FriendsList from '../FriendsListSubcomponents/FriendsList';
import { UseContextAll } from '../ContextAll';

// TODO: add invite button to either FriendsList as a conditionally rendered button
// OR map each individual friend to a new friends list with invite buttons
function InviteFriends({onClose, isOpen, members }) {
  const { userFriends, mainPage } = UseContextAll();
  const [isGroupInvite, SetGroupInvite] = useState(true);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite friends to this group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FriendsList friends={userFriends.friendlist} isGroupInvite={isGroupInvite} members={members}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InviteFriends;
