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
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { format } from 'timeago.js';
import socket from './chatclient';



import { UseContextAll } from './ContextAll';
import { please } from '../request';

export const sendInvite = (to, from, groupID) => {
  const inviteMessage = `___invite___${groupID}`;
  const sendData = {
    message: inviteMessage,
    receiver_id: to, // the friends userId
    sender_id: from, // the senders userId
    createdat: Date.now(),
  };
  please.postMessage(from, to, inviteMessage);
  socket.emit('message', sendData);
}

export default function ChatBar() {
  const {
    userID, userFriends,
    userGroups, currentUserID,
    openChatModal, setOpenChatModal,
    setCurrentGroupID, setMainPage,
  } = UseContextAll();
  const [chatFocus, setChatFocus] = useState(false);
  const [friendID, setFriendID] = useState(0);
  const [friendName, setFriendName] = useState('');
  const chatInput = useRef();
  const modalChatInput = useRef();
  const [messageHistory, setMessageHistory] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
  const messageRef = useRef([]);
  const messageToast = useToast();
  const toastRef = useRef();
  const { isOpen: modalIsOpen, onOpen: modalOnOpen, onClose: modalOnClose } = useDisclosure();
  const chatHistoryRef = useRef();
  const modalChatBarRef = useRef();
  const friendRef = useRef();
  const [lastMessages, setLastMessages] = useState({});
  const sendChat = (event) => {
    event.preventDefault();
    const input = modalIsOpen ? modalChatInput : chatInput;
    const message = input.current.value;
    const sendData = {
      message,
      receiver_id: friendID, // the friends userId
      sender_id: userID, // the senders userId
      createdat: Date.now(),
    };
    setMessageHistory([...messageHistory, sendData]);
    please.postMessage(userID, friendID, message);
    socket.emit('message', sendData);
    input.current.value = '';
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo({ top: chatHistoryRef.current.scrollHeight });
    }
  }, [messageHistory]);

  useEffect(() => {
    messageRef.current = messageHistory;
    friendRef.current = friendID;
  });

  useEffect(() => {
    if (openChatModal) {
      setFriendID(currentUserID);
    }
  }, [openChatModal]);

  useEffect(() => {
    if (openChatModal) {
      modalOnOpen()
    }
  }, [friendID]);

  useEffect(() => {
    if (!modalIsOpen) {
      setOpenChatModal(false);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    socket.off('messageResponse');
    socket.on('messageResponse', (data) => {
      if (data.receiver_id === userID) {
        if (data.sender_id == friendRef.current) {
          setMessageHistory([...messageRef.current, data]);
        }
        const friend = userFriends.friendlist.filter((f) => f.id === data.sender_id)[0];
        toastRef.current = messageToast({
          duration: 2000,
          isClosable: true,
          render: () => (
            <Alert status="info" borderRadius="md" p={3}>
              <Flex flexDirection="column">
                <AlertIcon />
                <Center>
                  <AlertTitle>New Message</AlertTitle>
                </Center>
                <Center>
                  <AlertDescription>
                    { (friend && friend.firstname) ? `You have a message from ${friend.firstname}` : 'You have a new message!' }
                  </AlertDescription>
                </Center>
                <Center>
                  <Button
                    onClick={
                      () => { setFriendID(data.sender_id); messageToast.close(toastRef.current); }
                    }
                    variant="ghost"
                  >
                    Reply
                  </Button>
                </Center>
              </Flex>
            </Alert>
          ),
        });
      }
    });
  }, [userID]);

  useEffect(() => {
    please.getMessages(userID, friendID).then((res) => setMessageHistory(res.data));
    setTimeout(() => {
      if (chatHistoryRef.current) {
        chatHistoryRef.current.scrollTo({ top: chatHistoryRef.current.scrollHeight });
      }
    }, 100);
    if (userFriends && userFriends.friendlist) {
      userFriends.friendlist.forEach(f => {
        please.getMessages(userID, f.id).then((res) => {
          const data = res.data.filter(msg => !msg.message.startsWith('___invite___'));
          if (data.length) {
            lastMessages[f.id] = data[data.length - 1].message;
          }
          setLastMessages({ ...lastMessages });
        });
      });
    }
  }, [friendID, modalIsOpen]);

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
                            <Text as="i">
                              {
                                msg.sender_id === userID ? 'me' /*userInfo.firstname*/ : friendName}, {format(msg.createdat)
                              }
                            </Text>
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
              { !modalIsOpen ? (
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
              ) : null }
            </FormControl>
          </Center>
          <Menu>
            <MenuButton ml="4px" mr="4px" as={Button}>Chat Menu</MenuButton>
            <MenuList>
              { userFriends.friendlist ? userFriends.friendlist.slice(0,4).map(friend => (
                <MenuItem
                  key={friend.id}
                  onClick={
                    () => {
                      setFriendID(friend.id);
                      setFriendName(friend.firstname);
                    }
                  }
                >
                  <Box w="100%">
                    <Flex>
                      <Avatar src={friend.picture} />
                      <Spacer />
                      <Flex flexDirection="column">
                        <Text>{friend.firstname}</Text>
                        <Text as="i">
                          {  }
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </MenuItem>
              )) : null}
              <MenuItem
                onClick={() => modalOnOpen()}
              >
                <Link>View chats and message history</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
      <Modal size='full' isCentered isOpen={modalIsOpen} onClose={modalOnClose}>
        <ModalContent minH="80%" maxW="80%">
          <ModalHeader>All Your Messages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid w="100%" h="calc(80vh)" templateRows="10fr 1fr" templateColumns="1fr 5fr">
              <GridItem pr={4} minW="200px" maxW="300px">
                <VStack minW="200px" maxW="300px" maxH="calc(80vh)" overflowY="auto">
                  { userFriends.friendlist ? userFriends.friendlist.map(friend => (
                    <Box as={Button}
                      minH="60px"
                      minW="200px"
                      key={friend.id}
                      variant={friend.id === friendID ? null : 'ghost' }
                      onClick={() => {
                        setFriendID(friend.id);
                        setFriendName(friend.firstname);
                      }}
                    >
                      <Box w="100%">
                        <Flex>
                          <Avatar src={friend.picture} />
                          <Flex minW="150px" flexDirection="column">
                            <Text>{friend.firstname}</Text>
                            <Text as="i">
                              {
                                lastMessages.hasOwnProperty(friend.id) ?
                                (lastMessages[friend.id].length > 12 ? lastMessages[friend.id].slice(0, 12) + '...' :
                                lastMessages[friend.id]) : null
                              }
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  )) : null}
                </VStack>
              </GridItem>
              <GridItem>
                <Box  w="100%" maxH="calc(70vh)" ref={chatHistoryRef} overflowY="auto" flexDirection="column">
                  { messageHistory.length ? messageHistory.map((msg, i) => {
                    if (msg.message.startsWith('___invite___'))  {
                      const groupId = Number(msg.message.replace('___invite___', ''));
                      const group = (async () => {
                        let thing = await please.getGroupInfo(groupId);
                        return thing;
                      })();
                      if (
                        userGroups && (userGroups.filter(grp => grp.id === groupId).length === 0)
                      ) {
                        return (
                          <Box>
                            <Button onClick={() => {
                              setCurrentGroupID(groupId);
                              setMainPage('group');
                              modalOnClose();
                            }}>
                              Join This Group
                            </Button>
                          </Box>
                        );
                      }
                      return null
                    }
                    return (
                      <Box w="100%" mb={4} key={i}>
                        <Flex w="100%" >
                          {msg.sender_id === userID ? <Spacer /> : null}
                          <Center minW="25%">
                            <Alert borderRadius='md' w="100%" p={4} status={msg.sender_id === userID ? 'success' : 'warning'}>
                              <Flex flexDirection="column">
                                <Text>{msg.message}</Text>
                                <Text as="i">{msg.sender_id === userID ? 'me' : friendName}, {format(msg.createdat)}</Text>
                              </Flex>
                            </Alert>
                          </Center>
                          {msg.sender_id === userID ? null: <Spacer />}
                        </Flex>
                      </Box>
                    );
                  }) : <Text>You have no saved messages with {friendName}</Text> }
                  <Spacer />
                </Box>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl ref={modalChatBarRef}>
                  <form onSubmit={sendChat}>
                    <Input
                      disabled={(friendID === 0)}
                      ref={modalChatInput}
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
