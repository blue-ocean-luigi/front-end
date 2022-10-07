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
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  Select,
  Stack,
  Box,
} from '@chakra-ui/react';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';

const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';

function NewEvent({ updateFeed }) {
  const { userID, currentGroupID } = UseContextAll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setEventName] = useState('');
  const [content, setContent] = useState('');
  const [eventPhoto, setEventPhoto] = useState('');
  const [startHour, setStartHour] = useState('12');
  const [startMins, setStartMins] = useState('00');
  const [startMeridiem, setStartMeridiem] = useState('PM');
  const [startDate, setStartDate] = useState('');
  const [endHour, setEndHour] = useState('1');
  const [endMins, setEndMins] = useState('00');
  const [endMeridiem, setEndMeridiem] = useState('PM');
  const [endDate, setEndDate] = useState('');

  function handleTime(hour, mins, meridiem) {
    let time;
    if (meridiem === 'PM') {
      time = ((Number(hour) + 12) * 100) + Number(mins);
    } else {
      time = (Number(hour) * 100) + Number(mins);
    }
    return time;
  }

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
        setEventPhoto(response.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    const formBody = {
      user_id: userID,
      group_id: currentGroupID,
      eventname: name,
      content: content,
      photos: [eventPhoto],
      isevent: true,
      // location, <= need to add google stuff
      starttime: handleTime(startHour, startMins, startMeridiem),
      startdate: startDate,
      endtime: handleTime(endHour, endMins, endMeridiem),
      enddate: endDate,
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
    <Box ml={1} mr={2}>
      <Button onClick={onOpen}>New Event</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name of Event</FormLabel>
              <Input type="text" onChange={(e) => { setEventName(e.target.value); }} />

              <FormLabel>About the Event</FormLabel>
              <Textarea onChange={(e) => { setContent(e.target.value); }} />

              <FormLabel>Upload a Picture for the Event</FormLabel>
              <Input type="file" onChange={(e) => { handlePhoto(e); }} />

              <FormLabel>Location of Event</FormLabel>

              <FormLabel>Date and Time</FormLabel>
              <FormHelperText>Start Date</FormHelperText>
              <Input type="date" onChange={(e) => { setStartDate(e.target.value); }} />
              <FormHelperText>End Date</FormHelperText>
              <Input type="date" onChange={(e) => { setEndDate(e.target.value); }} />
              <FormHelperText>Start Time</FormHelperText>
              <Stack shouldWrapChildren direction="row">
                <Select placeholder="12" onChange={(e) => { setStartHour(e.target.value); }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Select>
                <FormHelperText>:</FormHelperText>
                <Select placeholder="00" onChange={(e) => { setStartMins(e.target.value); }}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </Select>
                <Select placeholder="PM" onChange={(e) => { setStartMeridiem(e.target.value); }}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </Stack>
              <FormHelperText>End Time</FormHelperText>
              <Stack shouldWrapChildren direction="row">
                <Select placeholder="1" onChange={(e) => { setEndHour(e.target.value); }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Select>
                <FormHelperText>:</FormHelperText>
                <Select placeholder="00" onChange={(e) => { setEndMins(e.target.value); }}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </Select>
                <Select placeholder="PM" onChange={(e) => { setEndMeridiem(e.target.value); }}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { handleSubmit(); }}>
              Post Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NewEvent;
