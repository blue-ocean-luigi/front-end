import React, { useState, useEffect } from 'react';
import { BiHomeSmile, BiMessageAdd } from 'react-icons/bi';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
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
  Badge,
  Box,
} from '@chakra-ui/react';
import CommentList from '../Comments/CommentList';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';
import Maps from './Maps';

function EventView({
  eventInfo, handleLike, sendComment, rsvps, setRsvps, setEvents,
}) {
  const { userID } = UseContextAll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');
  const [going, setGoing] = useState(rsvps.filter((r) => r.user_id === userID).length > 0);
  const [currentComments, setCurrentComments] = useState(eventInfo.comments);

  function sendRSVP() {
    please.createRsvp({ post_id: eventInfo.post_id, user_id: userID, paid: false })
      .then((res) => please.getRsvp(eventInfo.post_id))
      .then((res) => setRsvps(res.data))
      .then((res) => setGoing(true))
      .catch((err) => console.log(err));
  }

  function handleInvite() {
    console.log('handle invite');
  }

  function sendComment(comment) {
    console.log('HAI sending comment nao: ', eventInfo);
    // const { event, setEvents, userID, updateFeed, currentGroupID } = this.props;
    please.createComment({ post_id: eventInfo.post_id, user_id: userID, message: comment })
      .then((response) => {
        console.log('HAI posted comment: ', response);
        setComment('');
      })
      .then((res) => please.getGroupPosts(eventInfo.group_id))
      .then((res) => {
        setEvents(res.data);
        onClose();
        // const newComments = res.data.filter(i=> i.post_id===event.post_id)[0].comments;
        // this.setState({comments: newComments})
      })
      .catch((err) => console.log('HAI hit an error getting group posts: ', err));
  }

  useEffect(() => {
    let already = false;
    if (rsvps.length > 0) {
      for (const users of rsvps) {
        if (users.user_id === userID) {
          already = true;
          break;
        }
      }
    }
    if (already === true) {
      setGoing(true);
    }
  }, [rsvps]);

  return (
    <div>
      <Button mt={4} mb={1} size="sm" backgroundColor="#f7d359" onClick={onOpen}>Event Details</Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader p={-2} mb={4}>{eventInfo.eventname}</ModalHeader>
          <ModalCloseButton />
          <Image
            mr={2}
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            src={eventInfo.picture ? eventInfo.picture : 'https://picsum.photos/seed/picsum/200/300'}
            alt="Event Pic"
          />
          <Box w="100%" mt={4}>
            <Text fontSize="xl">
              Posted in
              {' '}
              {eventInfo.groupname}
            </Text>
            <Text>{eventInfo.starttime}</Text>
          </Box>
          <ModalBody>
            {eventInfo.content}
          </ModalBody>
          <Stack shouldWrapChildren direction="row">
            <Text>
              {' '}
              {eventInfo.postlikes.length}
              {' '}
            </Text>
            <Tooltip label="likes">
              <span><Icon as={BiHomeSmile} w={6} h={6} onClick={() => handleLike()} /></span>
            </Tooltip>
            <Text>
              {' '}
              {eventInfo.comments.length}
              {' '}
            </Text>
            <Tooltip label="comments">
              <span><Icon as={BiMessageAdd} w={6} h={6} onClick={() => console.log('scroll to comment?')} /></span>
            </Tooltip>
            <Text>
              {' '}
              {rsvps.length}
              {' '}
            </Text>
            <Tooltip label="RSVPs">
              <span><Icon as={FaRegEnvelopeOpen} w={6} h={6} /></span>
            </Tooltip>
          </Stack>
          <Maps endLoc={eventInfo.location} />
          <ModalFooter>
            <Button mr={1} backgroundColor="#f7d359" variant="ghost" onClick={() => handleInvite()}> Invite </Button>
            { !going
              && <Button ml={1} backgroundColor="#f7d359" variant="ghost" onClick={() => sendRSVP()}> RSVP </Button>}
            {
              going
              && <Badge colorScheme="grey" variant="subtle">You RSVPed</Badge>
            }
          </ModalFooter>
          <CommentList comments={eventInfo.comments} />
          <Textarea
            value={comment}
            onChange={(e) => { setComment(e.target.value); }}
            placeholder="...your comment here"
            size="sm"
          />
          <Box align="right"><Button width="25%" mt={4} colorScheme="gray" variant="ghost" onClick={() => sendComment(comment)}> Post Comment </Button></Box>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EventView;
