import React from 'react';
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
  Icon,
} from '@chakra-ui/react';

function EventView({ eventInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);

  // function sendRSVP() {
  //   if
  // }

  function sendComment() {
    console.log('handle comment');
    setComment('');
  }

  function handleLike() {
    if (likeCount < 1) {
      console.log('send a like, then increase likeCOunt');
    }
  }
  return (
    <div>
      <Button onClick={onOpen}>Event Details</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Name</ModalHeader>
          <ModalCloseButton />
          <Text>Posted by *username* in *group name*</Text>
          <Text>Date and Time Here</Text>
          <ModalBody>
            About the event
          </ModalBody>
          <Stack shouldWrapChildren direction="row">
            <Text> *no.Likes* </Text>
            <Icon as={BiHomeSmile} w={6} h={6} onClick={() => { handleLike(); }} />
            <Text> *no.comments</Text>
            <Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} />
          </Stack>
          <ModalFooter>
            <Botton colorScheme="blue" onClick={() => sendRSVP()}>RSVP</Botton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EventView;
