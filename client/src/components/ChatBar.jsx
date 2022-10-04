import React, { useRef } from 'react';
import { io } from 'socket.io-client';
import {
  Box,
  Flex,
  Spacer,
  Center,
  Input,
  FormControl,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// const socket = io(/* url goes here, enable CORS if needed */);

export default function ChatBar() {
  const socket = io('http://localhost:3002');
  socket.on('message', (data) => {
    console.log(data);
  });
  socket.on('messageResponse', (data) => {
    console.log(data);
  });
  const chatInput = useRef()
  const sendChat = (event) => {
    event.preventDefault();
    const message = chatInput.current.value;
    const sendData = {
      text: message,
      to: 2, // the friends userId
      from: 1, // the senders userId
      at: new Date()
    };
    console.log(sendData);
    socket.emit('message', sendData);
    chatInput.current.value = '';
  }
  
  return (
    <Box marginBottom="8px" bgColor='primary' position="fixed" bottom="0" left="0" width="100%">
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <FormControl>
              <form onSubmit={sendChat}>
                <Input
                  ref={chatInput}
                  ml="4px"
                  mr="4px"
                  placeholder="send a message"
                  variant='filled'
                />
              </form>
            </FormControl>
          </Center>
          <Menu>
            <MenuButton ml="4px" mr="4px" as={Button}>Chat Menu</MenuButton>
            <MenuList>
              <MenuItem>Friends</MenuItem>
              <MenuItem>Something Else...</MenuItem>
              <MenuItem>Lorem Ipsum</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
    </Box>
  )
}
