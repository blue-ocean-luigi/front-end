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

  const dummy = [
    {user_id: 1, firstName: 'Brian', lastName: 'Pham', picture: 'https://cdn.vox-cdn.com/thumbor/-naXoT1PTZa-nEbqdI5hsbHsIjo=/0x0:1215x717/1520x1013/filters:focal(662x145:856x339):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/52782137/Ahri_Splash_4.0.jpg'},
    {group_id: 1, name: 'Maplestory', picture: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:600/h:338/q:75/https://bleedingcool.com/wp-content/uploads/2022/06/MapleStory-Destiny-Remastered.jpg'}
  ]

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('searched for: ', search);
    setSearch('');
  }

  useEffect(() => {
    if (!search) {
      setContent([])
      return
    }
    //;(async () => {
    //    const results = await axios.get('')
    //    const data = results.data
    //    setContent(data)
    //  })()
  }, [search])

  return (
    <Flex h="100vh" w="100%" justifyContent="space-between">
      <VStack p={2} h="100vh" w="100%" gap={2}>
        <Flex h="fit-content" w="100%">
          <Box p={2} w="100%">
            <Heading mt={4} mb={1}>
              Home
            </Heading>
            <Input variant="filled" placeholder="Search for users and groupssss" onChange={(e) => handleChange(e)} value={search} />
            {/* <Button onClick={(e) => handleSubmit(e)}>Search</Button> */}

            <Box maxH='40vh' p='0' overflowY='auto'>
              <Box px={4}>
                <Box borderTopWidth='1px' pt={2} pb={4}>
                  <Searches data={dummy}/>
                </Box>
              </Box>
            </Box>
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
            <CreateGroupButton />
            <GroupList groups={userGroups} />
            <FriendsList friends={userFriends.friendlist} />
          </Box>
          {newUser ? <NewUserFeed /> : <ReturnUserFeed homePosts={homePosts} />}
        </Flex>
      </VStack>
    </Flex>
  );
}

export default HomePage;

// should list
// search, event feed, groups list & friends list,

// need to set up so that i render a list of fiends and a list of groups in the left column, and on click those utilize the context to re render the page based on
