import React, { useState } from 'react';
import { BiHomeSmile, BiMessageAdd } from "react-icons/bi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  useDisclosure,
  Text,
  Textarea,
  Icon,
  Image,
} from '@chakra-ui/react';
import CommentList from '../Comments/CommentList';
import Maps from './Maps';

function EventView({ eventInfo, handleLike, sendComment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');

  function sendRSVP() {
    console.log('send RSVP');
  }

  function handleInvite() {
    console.log('handle invite');
  }

  function handleComment() {
    sendComment(comment);
    setComment('');
  }

  return (
    <div>
      <Button onClick={onOpen}>Event Details</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{eventInfo.eventname}</ModalHeader>
          <ModalCloseButton />
          <Image
            borderRadius="full"
            boxSize="150px"
            src={eventInfo.picture}
            alt="Event Pic"
          />
          <Text>Posted by *username* in *group name*</Text>
          <Text>{eventInfo.starttime}</Text>
          <ModalBody>
            {eventInfo.content}
          </ModalBody>
          <Stack shouldWrapChildren direction="row">
            <Text> *no.Likes* </Text>
            <Icon as={BiHomeSmile} w={6} h={6} onClick={() => handleLike()} />
            <Text> *no.comments</Text>
            <Icon as={BiMessageAdd} w={6} h={6} onClick={() => console.log('scroll to comment?')} />
          </Stack>
          <Maps endLoc={eventInfo.location} />
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => sendRSVP()}> RSVP </Button>
            <Button colorScheme="ghost" onClick={() => handleInvite()}> Invite </Button>
          </ModalFooter>
          <CommentList comments={eventInfo.comments} />
          <Textarea
            value={comment}
            onChange={(e) => { setComment(e.target.value); }}
            placeholder="...your comment here"
            size="sm"
          />
          <Button colorScheme="blue" onClick={() => handleComment(comment)}> Post </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EventView;
