import React, { useRef, useState } from 'react';
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
  Avatar,
  Text,
} from '@chakra-ui/react';
import socket from './chatclient';

import { UseContextAll } from './ContextAll';


export default function ChatBar() {
  const { userInfo, userID, userFriends } = UseContextAll();
  const [chatFocus, setChatFocus] = useState(false);
  const [friendID, setFriendID] = useState(2)
  const [friendName, setFriendName] = useState('')
  const chatInput = useRef()
  //console.log(userInfo);
  //console.log(userFriends);
  //console.log(userFriends.friendlist);

  const sendChat = (event) => {
    event.preventDefault();
    const message = chatInput.current.value;
    const sendData = {
      text: message,
      to: friendID, // the friends userId
      from: userID, // the senders userId
      at: new Date()
    };
    //console.log(sendData);
    socket.emit('message', sendData);
    chatInput.current.value = '';
  }
  
  return (
    <Box marginBottom="8px" bgColor='primary' position="fixed" bottom="0" left="0" width="100%">
      { chatFocus ? (
        <Box>
          a thing
        </Box>
      ) : null }
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <FormControl>
              <form onSubmit={sendChat}>
                <Input
                  onFocus={() => setChatFocus(true)}
                  onBlur={() => setChatFocus(false)}
                  ref={chatInput}
                  ml="4px"
                  mr="4px"
                  placeholder={`send a message to ${friendName}`}
                  variant='filled'
                />
              </form>
            </FormControl>
          </Center>
          <Menu>
            <MenuButton ml="4px" mr="4px" as={Button}>Chat Menu</MenuButton>
            <MenuList>
              { userFriends.friendlist ? userFriends.friendlist.map(friend =>
              <MenuItem onClick={() => {setFriendID(friend.id); setFriendName(friend.firstname); }}>
                  <Box w="100%">
                    <Flex>
                      <Avatar src={friend.picture} />
                      <Spacer />
                      <Flex flexDirection="column">
                        <Text>{friend.firstname}</Text>
                        <Text as="i">Last thing said</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </MenuItem>
              ) : null}
              <MenuItem>View all chats</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
    </Box>
  )
}
