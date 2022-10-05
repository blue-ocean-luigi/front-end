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
  Heading,
  useDisclosure,
  Fade,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ModalOverlay,
} from '@chakra-ui/react';
import socket from './chatclient';
import { format } from 'timeago.js';


import { UseContextAll } from './ContextAll';
import { please } from '../request';


export default function ChatBar() {
  const { userInfo, userID, userFriends } = UseContextAll();
  const [chatFocus, setChatFocus] = useState(false);
  const [friendID, setFriendID] = useState(0)
  const [friendName, setFriendName] = useState('')
  const chatInput = useRef()
  const [messageHistory, setMessageHistory] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
  const messageRef = useRef([]);
  const messageToast = useToast();
  const toastRef = useRef();
  //console.log(userInfo);
  //console.log(userFriends);
  //console.log(userFriends.friendlist);


  const sendChat = (event) => {
    event.preventDefault();
    const message = chatInput.current.value;
    const sendData = {
      message: message,
      receiver_id: friendID, // the friends userId
      sender_id: userID, // the senders userId
      createdat: Date.now()
    };
    console.info(sendData.at);
      // console.log(data);
    setMessageHistory([...messageHistory, sendData])
    please.postMessage(userID, friendID, message);
    socket.emit('message', sendData);
    chatInput.current.value = '';
  }
  useEffect(() => {
    messageRef.current = messageHistory;
  });
  useEffect(() => {
    socket.on('messageResponse', (data) => {
      console.log(data.message);
      if (data.receiver_id === userID) {
        setMessageHistory([...messageRef.current, data]);
        const friend = userFriends.friendlist.filter(f => f.id === data.sender_id)[0];
        toastRef.current = messageToast({
          duration: 2000,
          isClosable: true,
          render: () => (
            <Alert status='info' borderRadius='md' p={3}>
              <Flex flexDirection="column">
                <AlertIcon />
                <Center><AlertTitle>New Message</AlertTitle></Center>
                <Center><AlertDescription>{ `You have a message from ${friend.firstname}`}</AlertDescription></Center>
                <Center><Button onClick={() => { setFriendID(data.sender_id); messageToast.close(toastRef.current); }} variant='ghost'>Reply</Button></Center>
              </Flex>
            </Alert>
          )
        })
      }
    });
  }, [userID]);
  useEffect(() => {
    please.getMessages(userID, friendID).then(res =>setMessageHistory(res.data))
  }, [friendID]);
  const lastFive = (list) => [...list].reverse().slice(0, 4).reverse();

  return (
    <Box marginBottom="8px" bgColor='primary' position="fixed" bottom="0" left="0" width="100%">
      { chatFocus ? (
        <Fade in={isOpen}>
          <Box bgColor="gray.600" borderRadius="md" ml={4} mr={4}>
          <Alert w="100%" status="info" opacity="1.0" p={4} mb={4} borderRadius='md'>
            <Flex w="100%" flexDirection="column">
              { messageHistory.length ? lastFive(messageHistory).map(msg => (
                <Box w="100%" mb={4}>
                  <Flex w="100%" >
                    {msg.sender_id === userID ? <Spacer /> : null}
                    <Center minW="25%" maxW="75%">
                      <Alert borderRadius='md' w="100%" p={4} status={msg.sender_id === userID ? 'success' : 'warning'}>
                        <Flex flexDirection="column">
                          <Text>{msg.message}</Text>
<<<<<<< HEAD
                          <Text as="i">{msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, {format(msg.createdat)}</Text>
=======
                          <Text as="i">From: {msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, at {(new Date(msg.createdat)).toLocaleString()}</Text>
>>>>>>> main
                        </Flex>
                      </Alert>
                    </Center>
                    {msg.sender_id === userID ? null: <Spacer />}
                  </Flex>
                </Box>
              )) : <Text>You have no saved messages with {friendName}</Text> }
              <Button>View full chat history</Button>
            </Flex>
          </Alert>
          </Box>
        </Fade>
      ) : null }
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <FormControl>
              <form onSubmit={sendChat}>
                <Input
                  disabled={(friendID === 0)}
                  onFocus={() => { onToggle(); setChatFocus(true)}}
                  onBlur={() => { onToggle(); setChatFocus(false); }}
                  ref={chatInput}
                  pl={4}
                  pr={4}
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

function AllMessages () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(
  <Modal isCentered isOpen={isOpen}
  return (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );
}
