import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
} from '@chakra-ui/react'
import { UseContextAll } from '../ContextAll';
import { please } from '../../request.jsx'

function BioUpdate(props) {
  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
  } = UseContextAll();

  const { isOpen, onOpen, onClose } = useDisclosure()
  let [value, setValue] = useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let handleBioUpdate = (e) => {
    e.preventDefault();
    props.updateBio(value)

    //close modal & reset form
    onClose()

    console.log(value)

    please.updateUser(userInfo.firstname, userInfo.lastname, userInfo.email, value, userInfo.picture, userInfo.id, userInfo.banner)

    .then((data)=> console.log(data))
    .catch((err)=>console.log(err))
  }


  return (
    <>
      <Button onClick={onOpen}  position="absolute" right="5px" bottom="5px">Update Bio</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Bio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter new biography"
              value={value}
              onChange={handleInputChange}
              size="L"/>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={(e)=>handleBioUpdate(e)}>Update!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default BioUpdate;