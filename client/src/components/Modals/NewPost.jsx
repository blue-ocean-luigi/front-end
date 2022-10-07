import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  FormHelperText,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react';
import { please } from '../../request';
import {UseContextAll} from '../ContextAll';

const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';

function NewPost({ userID, updateFeed }) {
  const {currentGroupID} = UseContextAll();
  console.log('NewPost here is groupID: ', currentGroupID)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState('');
  const [postPhoto, setPostPhoto] = useState();

  function handlePhoto(e) {
    const body = new FormData();
    body.set('key', IMGBB_API_KEY);
    body.append('image', e.target.files[0]);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((response) => {
        setPostPhoto(response.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    const formBody = {
      user_id: userID,
      group_id: currentGroupID,
      content: postContent,
      isevent: false,
      photos: [postPhoto],
    };
    please.createPost(formBody)
      .then(() => {
        updateFeed();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box mr={1}>
      <Button onClick={onOpen}>New Post</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Post on *group Name*</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Textarea onChange={(e) => { setPostContent(e.target.value); }} />
              <FormLabel>Add a photo</FormLabel>
              <Input type="file" onChange={(e) => { handlePhoto(e); }} />
              <FormHelperText>Optional</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { handleSubmit(); }}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NewPost;
