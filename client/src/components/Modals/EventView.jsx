import React, { useState, useEffect } from 'react';
import { BiHomeSmile, BiMessageAdd } from "react-icons/bi";
import { FaRegEnvelopeOpen } from "react-icons/fa";
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
  Tooltip,
} from '@chakra-ui/react';
import CommentList from '../Comments/CommentList';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';
import Maps from './Maps';

function EventView({ eventInfo, handleLike, sendComment, rsvps, setRsvps }) {
  console.log('DEBUG this is eventinfo: ', eventInfo)
  const { userID } = UseContextAll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');
  const [going, setGoing] = useState(rsvps.filter(r => r.user_id === userID).length > 0);

  console.log('DEBUG this is rsvps: ', rsvps)
  console.log('DEBUG this is going: ', rsvps.filter(r => r.user_id === userID).length > 0)

  function sendRSVP() {
    please.createRsvp({ post_id: eventInfo.post_id, user_id: userID, paid: false })
      .then((res) => please.getRsvp(eventInfo.post_id))
      .then((res) => setRsvps(res.data))
      .then((res) => setGoing(true))
      .catch((err) => console.log(err))
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
        <ModalContent p={4}>
          <ModalHeader>{eventInfo.eventname}</ModalHeader>
          <ModalCloseButton />
          <Image
            borderRadius='full'
            boxSize='150px'
            src={eventInfo.picture ? eventInfo.picture : 'https://picsum.photos/seed/picsum/200/300'}
            alt="Event Pic"
          />
          <Text>Posted in {eventInfo.groupname}</Text>
          <Text>{eventInfo.starttime}</Text>
          <ModalBody>
            {eventInfo.content}
          </ModalBody>
          <Stack shouldWrapChildren direction="row">
            <Text> {eventInfo.postlikes.length} </Text>
            <Tooltip>
              <span><Icon as={BiHomeSmile} w={6} h={6} onClick={() => handleLike()} /></span>
            </Tooltip>
            <Text> {eventInfo.comments.length} </Text>
            <Tooltip label="comments">
              <span><Icon as={BiMessageAdd} w={6} h={6} onClick={() => console.log('scroll to comment?')} /></span>
            </Tooltip>
            <Text> {rsvps.length} </Text>
            <Tooltip label="RSVPs">
              <span><Icon as={FaRegEnvelopeOpen} w={6} h={6} /></span>
            </Tooltip>
          </Stack>
          <Maps endLoc={eventInfo.location} />
          <ModalFooter>
            { !going
              && <Button colorScheme="blue" onClick={() => sendRSVP()}> RSVP </Button>
            }
            {
              going
              && <Badge colorScheme="blue">Going</Badge>
            }
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
