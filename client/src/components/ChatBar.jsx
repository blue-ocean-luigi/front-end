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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { format } from 'timeago.js';
import socket from './chatclient';
import { render } from 'timeago.js';




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
  const { isOpen: modalIsOpen, onOpen: modalOnOpen, onClose: modalOnClose } = useDisclosure();
  const chatHistoryRef = useRef();
  const modalChatBarRef = useRef();
  const sendChat = (event) => {
    event.preventDefault();
    const message = chatInput.current.value;
    const sendData = {
      message: message,
      receiver_id: friendID, // the friends userId
      sender_id: userID, // the senders userId
      createdat: Date.now()
    };
    setMessageHistory([...messageHistory, sendData])
    please.postMessage(userID, friendID, message);
    socket.emit('message', sendData);
    chatInput.current.value = '';
  }
  useEffect(() => {
    messageRef.current = messageHistory;
  });
  useEffect(() => {
    socket.off('messageResponse');
    socket.on('messageResponse', (data) => {
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
    //chatHistoryRef.current.scrollTo({top: chatHistoryRef.current.scrollHeight});
    if (chatHistoryRef.current) {
      setTimeout(() => {
        chatHistoryRef.current.scrollTo({top: chatHistoryRef.current.scrollHeight});
      }, 100);
    }
    if (modalChatBarRef.current) {
      //modalChatRef.current.offsetHeight = modalChatBarRef.current.parentElement.offsetHeight;
    }
  }, [friendID]);
  const lastFive = (list) => [...list].reverse().slice(0, 4).reverse();

  useEffect(() => {
  }, [modalIsOpen]);

  return (
    <Box
      marginBottom="8px"
      bgColor='primary'
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      onClick={(e) => e.preventDefault()}
    >
      { chatFocus ? (
        <Fade in={isOpen}>
          <Box bgColor="gray.600" borderRadius="md" ml={4} mr={4}>
          <Alert w="100%" status="info" opacity="1.0" p={4} mb={4} borderRadius='md'>
            <Flex w="100%" flexDirection="column">
              { messageHistory.length ? lastFive(messageHistory).map((msg, i) => (
                <Box w="100%" mb={4} key={i}>
                  <Flex w="100%" >
                    {msg.sender_id === userID ? <Spacer /> : null}
                    <Center minW="25%" maxW="75%">
                      <Alert borderRadius='md' w="100%" p={4} status={msg.sender_id === userID ? 'success' : 'warning'}>
                        <Flex flexDirection="column">
                          <Text>{msg.message}</Text>
                          <Text as="i">{msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, {format(msg.createdat)}</Text>
                        </Flex>
                      </Alert>
                    </Center>
                    {msg.sender_id === userID ? null: <Spacer />}
                  </Flex>
                </Box>
              )) : <Text>You have no saved messages with {friendName}</Text> }
              <Text>View your chat history from the chat menu!</Text>
            </Flex>
          </Alert>
          </Box>
        </Fade>
      ) : null }
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <FormControl>
              { !modalIsOpen ?
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
              : null }
            </FormControl>
          </Center>
          <Menu>
            <MenuButton ml="4px" mr="4px" as={Button}>Chat Menu</MenuButton>
            <MenuList>
              { userFriends.friendlist ? userFriends.friendlist.map(friend =>
              <MenuItem key={friend.id} onClick={() => {setFriendID(friend.id); setFriendName(friend.firstname); }}>
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
              <MenuItem><Link onClick={() => modalOnOpen()}>View chats and message history</Link></MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
      <Modal size='full' isCentered isOpen={modalIsOpen} onClose={modalOnClose}>
        <ModalContent minH="80%" maxW="80%">
          <ModalHeader>All Your Messages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid w="100%" h="calc(80vh)" templateRows="10fr 1fr" templateColumns="0.1fr, 5fr">
              <GridItem pr={4}>
                <VStack maxW="200px" maxH="calc(80vh)" overflowY="auto">
                { userFriends.friendlist ? userFriends.friendlist.map(friend =>
                <Box as={Button} minH="60px" key={friend.id} onClick={() => {setFriendID(friend.id); setFriendName(friend.firstname); }}>
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
                  </Box>
                ) : null}
                </VStack>
              </GridItem>
              <GridItem>
                <Box  w="100%" maxH="calc(70vh)" ref={chatHistoryRef} overflowY="auto" flexDirection="column">
                  { messageHistory.length ? messageHistory.map((msg, i) => (
                    <Box w="100%" mb={4} key={i}>
                      <Flex w="100%" >
                        {msg.sender_id === userID ? <Spacer /> : null}
                        <Center minW="25%" maxW="75%">
                          <Alert borderRadius='md' w="100%" p={4} status={msg.sender_id === userID ? 'success' : 'warning'}>
                            <Flex flexDirection="column">
                              <Text>{msg.message}</Text>
                              <Text as="i">{msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, {format(msg.createdat)}</Text>
                            </Flex>
                          </Alert>
                        </Center>
                        {msg.sender_id === userID ? null: <Spacer />}
                      </Flex>
                    </Box>
                  )) : <Text>You have no saved messages with {friendName}</Text> }
                </Box>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl ref={modalChatBarRef}>
                  <form onSubmit={sendChat}>
                    <Input
                      disabled={(friendID === 0)}
                      ref={chatInput}
                      pl={4}
                      pr={4}
                      placeholder={`send a message to ${friendName}`}
                      variant='filled'
                      position="relative"
                      bottom="0"
                    />
                  </form>
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

function AllMessages () {
}
