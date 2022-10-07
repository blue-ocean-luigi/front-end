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
} from '@chakra-ui/react';
import axios from 'axios'
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
  } = UseContextAll();
  const [newUser, setNewUser] = useState(false);
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);

  const debounce = (func, timeout = 500)  => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {func.apply(this, args); }, timeout)
    }
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (!search) {
      setContent([])
      return
    }
    ;(async () => {
      try {
        const results = await please.searchPeopleAndGroups(search)
        const data = results.data
        setContent(data)
        console.log('THIS IS DATA', data)

      } catch (err) {
        console.log(err)
      }

     })()
  }, [search])

  return (
    <Flex h="100vh" w="100%" justifyContent="space-between">
      <VStack p={2} h="100vh" w="100%" gap={2}>
        <Flex h="fit-content" w="100%">
          <Box p={2} w="100%">
            <Heading mt={4} mb={1}>
              Home
            </Heading>
            <Input variant="filled" placeholder="Search for users and groupssss" onChange={(e) => handleChange(e)} value={search} width='99%'/>
            {/* <Button onClick={(e) => handleSubmit(e)}>Search</Button> */}
            { content[0] &&
            <Box>
              <Box style={{position: "absolute", width:"100%", zIndex:1, backgroundColor: 'var(--chakra-colors-chakra-body-bg'}}>
                <Box px={4}>
                  <Box borderTopWidth='1px' pt={2} pb={4}>
                    <Searches data={content}/>
                  </Box>
                </Box>
              </Box>
            </Box>}
          </Box>
        </Flex>
        <Divider />
        <Flex bottom={0} h="100%" w="100%">

          <Box
            h="100%"
            w="30%"
            rounded="lg"
            p={1}
          >
            <Box w="100%" h="fit-content" p={1} align="center">
              <Image
                boxSize="200px"
                src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg"
                alt="User Name"
                borderRadius="full"
                onClick={() => console.log('clicked profile image')}
              />
            </Box>
            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '15px'}}>
              <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '15px'}}>
                <Heading fontSize='30px' paddingRight='15px'>Your Groups</Heading>
                <CreateGroupButton />
              </Box>
              <GroupList groups={userGroups} />
              <FriendsList friends={userFriends.friendlist} />
            </Box>
          </Box>
          {newUser ? <NewUserFeed /> : <ReturnUserFeed homePosts={homePosts} />}
        </Flex>
      </VStack>
    </Flex>
  );
}

export default HomePage;
