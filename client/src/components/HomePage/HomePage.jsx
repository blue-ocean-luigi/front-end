import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Button,
  Input,
  Form,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  Spacer,
} from '@chakra-ui/react';
import axios from 'axios';
import Searches from './Searches';
import GroupPage from '../GroupPage';
import FriendsList from '../FriendsListSubcomponents/FriendsList';
import HomeFeedPost from './post/HomeFeedPost';
import NewUserFeed from './NewUserFeed';
import ReturnUserFeed from './ReturnUserFeed';
import GroupList from '../GroupList/GroupList';
import './HomePage.css';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';
import CreateGroupButton from './CreateGroupButton';
//  props should be user info, if user is new
function HomePage() {
  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
    userID,
    setMainPage,
    setCurrentUserID,
  } = UseContextAll();
  const [newUser, setNewUser] = useState(false);
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (!search) {
      setContent([]);
      return;
    }
    (async () => {
      try {
        const results = await please.searchPeopleAndGroups(search);
        const { data } = results;
        setContent(data);
        console.log('THIS IS DATA', data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [search]);

  function navProfile() {
    setCurrentUserID(userID);
    setMainPage('profile');
  }

  return (
    <Flex h="100vh" w="100%" justifyContent="space-between">
      <VStack p={2} h="100vh" w="100%" gap={2}>
        <Flex h="fit-content" w="100vw">
          <Box p={2} w="100%">
            <Heading mt={4} mb={1}>
              Home
            </Heading>
            <Input variant="filled" placeholder="Search for users and groupssss" onChange={(e) => handleChange(e)} value={search} width="99%" />
            {/* <Button onClick={(e) => handleSubmit(e)}>Search</Button> */}

            { content[0]
            && (
            <Box>
              <Box style={{
                position: 'absolute', width: '100%', zIndex: 1, backgroundColor: 'var(--chakra-colors-chakra-body-bg',
              }}
              >
                <Box px={4}>
                  <Box borderTopWidth="1px" pt={2} pb={4}>
                    <Searches data={content} />
                  </Box>
                </Box>
              </Box>
            </Box>
            )}
          </Box>
        </Flex>
        <Divider />
        <Flex bottom={0} h="100%" w="100%" gap={10}>

          <Box
            h="100%"
            w="30%"
            rounded="lg"
            p={1}
            marginLeft="2%"
          >
            <Box w="100%" h="fit-content" p={1} align="center" onClick={() => navProfile()}>
              <Image
                objectFit="cover"
                boxSize="200px"
                src={userInfo.picture}
                alt="User Name"
                borderRadius="full"
                onClick={() => console.log('clicked profile image')}
              />
              <Text fontSize="2xl">{`${userInfo.firstname} ${userInfo.lastname}`}</Text>
            </Box>
            <Box style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '15px',
            }}
            >
              <CreateGroupButton />
              <GroupList groups={userGroups} />
              <Heading fontSize="20px" padding="20px">Your Friends</Heading>
              <FriendsList friends={userFriends.friendlist} />
            </Box>
          </Box>
          <Divider orientation="vertical" />
          {newUser ? <NewUserFeed /> : <ReturnUserFeed />}
        </Flex>
      </VStack>
    </Flex>
  );
}

export default HomePage;
