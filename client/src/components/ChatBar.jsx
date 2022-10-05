import React, { useRef, useState, useEffect } from 'react';
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
  useDisclosure,
  Fade,
} from '@chakra-ui/react';
import socket from './chatclient';

import { UseContextAll } from './ContextAll';
import { please } from '../request';


export default function ChatBar() {
  const { userInfo, userID, userFriends } = UseContextAll();
  const [chatFocus, setChatFocus] = useState(false);
  const [friendID, setFriendID] = useState(2)
  const [friendName, setFriendName] = useState('')
  const chatInput = useRef()
  const [messageHistory, setMessageHistory] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
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
  useEffect(() => {
    please.getMessages(userID, friendID).then(res =>setMessageHistory(res.data))
  }, [friendID]);
  
  return (
    <Box marginBottom="8px" bgColor='primary' position="fixed" bottom="0" left="0" width="100%">
      { chatFocus && messageHistory.length ? (
        <Fade in={isOpen}>
          <Box bgColor="gray.300" p={4} mb={4} borderRadius='md'>
            <Flex flexDirection="column">
              { messageHistory.map(msg => (
                <Box w="100%" mb={4}>
                  <Flex w="100%" >
                    {msg.sender_id === userID ? <Spacer /> : null}
                    <Center minW="25%" maxW="75%">
                      <Box borderRadius='md' w="100%" p={4} bgColor={msg.sender_id === userID ? 'teal' : 'white'}>
                          <Text>{msg.message}</Text>
                        <Text as="i">From: {msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, at {(new Date(msg.createdat)).toLocaleString()}</Text>
                      </Box>
                    </Center>
                    {msg.sender_id === userID ? null: <Spacer />}
                  </Flex>
                </Box>
              )) }
            </Flex>
          </Box>
        </Fade>
      ) : null }
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <FormControl>
              <form onSubmit={sendChat}>
                <Input
                  onFocus={() => { onToggle(); setChatFocus(true)}}
                  onBlur={() => { onToggle(); setChatFocus(false); }}
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
