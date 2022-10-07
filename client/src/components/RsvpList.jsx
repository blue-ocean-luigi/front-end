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
import RsvpListFeed from './FriendsListSubcomponents/RsvpListFeed';
import { UseContextAll } from './ContextAll';

// TODO: add invite button to either FriendsList as a conditionally rendered button
// OR map each individual friend to a new friends list with invite buttons
function RsvpList({onClose, isOpen, rsvps }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>People who have RSVPed to this event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RsvpListFeed friends={rsvps} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RsvpList;