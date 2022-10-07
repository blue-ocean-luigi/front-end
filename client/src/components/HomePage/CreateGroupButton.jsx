import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from '@chakra-ui/react';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';

const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';

function CreateGroupButton() {
  const [openModal, setOpenModal] = useState(false);
  const {
    userID, setCurrentGroupID, setMainPage, setUserGroups,
  } = UseContextAll();
  const formRef = useRef();

  const handlePhoto = (photo) => {
    const body = new FormData();
    body.set('key', IMGBB_API_KEY);
    body.append('image', photo);

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    });
  };

  const submitForm = async () => {
    const name = formRef.current.children[1].value;
    const city = formRef.current.children[3].value;
    const state = formRef.current.children[5].value;
    const zip = formRef.current.children[7].value;
    const about = formRef.current.children[9].value;
    const photofile = formRef.current.children[11].files[0];
    let photoURL = null;
    if (photofile !== undefined) {
      const getPhotoURL = await handlePhoto(photofile);
      photoURL = getPhotoURL.data.data.display_url;
    }

    const getId = await please.createNewGroup(userID, name, about, state, city, zip, photoURL);
    const updateGroups = await please.getGroupsOfUser(userID);

    const groupID = getId.data.id;
    setOpenModal(false);
    setUserGroups(updateGroups.data);
    setCurrentGroupID(groupID);
    setMainPage('group');
  };

  const clearForm = () => {
    formRef.current.children[1].value = '';
    formRef.current.children[3].value = '';
    formRef.current.children[5].value = '';
    formRef.current.children[7].value = '';
    formRef.current.children[9].value = '';
  };

  const onClick = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <Button onClick={onClick}>Create New Group</Button>
      <Modal isOpen={openModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Group</ModalHeader>
          <ModalCloseButton onClick={() => setOpenModal(false)} />
          <ModalBody>
            <FormControl ref={formRef} isRequired>
              <FormLabel>Group Name</FormLabel>
              <Input type="text" placeholder="Group Name" />
              <FormLabel>City</FormLabel>
              <Input type="text" placeholder="City" />
              <FormLabel>State</FormLabel>
              <Input type="text" maxlength="2" placeholder="XX" />
              <FormLabel>Zip</FormLabel>
              <Input type="text" maxLength="5" placeholder="XXXXX" />
              <FormLabel>Group Bio</FormLabel>
              <Textarea type="text" rows="6" placeholder="Group Bio" />
              <FormLabel requiredIndicator>picture</FormLabel>
              <Input type="file" style={{ border: '0px' }} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitForm}>
              Submit
            </Button>
            <Button mr={3} onClick={clearForm}>
              Clear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateGroupButton;
