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

function BioUpdate() {
  console.log('bio update modal')

  const { isOpen, onOpen, onClose } = useDisclosure()
  let [value, setValue] = useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let handleBioUpdate = (e) => {
    e.preventDefault();
    console.log(value)
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={(e)=>handleBioUpdate(e)}>Update!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default BioUpdate;