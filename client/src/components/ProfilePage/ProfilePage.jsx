import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MdBuild , MdInsertPhoto } from "react-icons/md"
import { UseContextAll } from '../ContextAll';
import './ProfilePage.css';
import FriendRequests from '../Modals/FriendRequests.jsx'
import FriendsList from '../FriendsListSubcomponents/FriendsList.jsx'
import GroupList from '../GroupList/GroupList.jsx'
import { please } from '../../request.jsx'

function ProfilePage() {
  const defaultBackgroundImage = 'https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg';
  const defaultProfilePic = 'https://i.pinimg.com/736x/50/d8/03/50d803bda6ba43aaa776d0e243f03e7b.jpg';

  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
  } = UseContextAll();

  const [banner, setBanner] = useState('');

  useEffect(() => {
    //  set banner to the one in db if it exists, otherwise use def
    const currBanner = userInfo.banner ? userInfo.banner : defaultBackgroundImage;
    setBanner(currBanner);
  }, []);

  // console.log(userInfo);
  // console.log(userFriends);

  return (
    <Center display="flex" flexDirection="column">
      <Box backgroundImage={`url(${banner})`} backgroundSize="cover" backgroundPosition="center" w="80%" h="40vh" minHeight="20vw" position="relative" m="1em">
        <Box position="absolute" right="5" top="5%" zIndex="2" cursor="pointer">
          <FriendRequests
            requests={userFriends.requestlist}
          />
        </Box>
        <Button rightIcon={<MdInsertPhoto />} position="absolute" right="5" bottom="5%">
          Update banner
        </Button>
        <Center w="20vw" h="100%" position="relative">
          <Image src={userInfo.picture === undefined ? userInfo.picture : defaultProfilePic} boxSize="15vw" borderRadius="full" position="absolute" top="calc((100% - 13vw) / 2)" />
          <Text zIndex="2" position="absolute" left="0" textAlign="center" top="calc((100% - 20vw) / 2)" fontSize="2em" color="white" transform="translateX(20%)">{`${userInfo.firstname} ${userInfo.lastname}`}</Text>
        </Center>
      </Box>
      <Box minHeight="20vh" w="80%" border="1px solid gray" mb="1em">
        <Text fontSize="2em">About Me</Text>
        <Text fontSize="1.2em">{userInfo.aboutme || 'This user has not filled out their bio :('}</Text>
      </Box>
      <Flex flexDirection="row" w="80%" justifyContent="space-evenly">
        <Box w="50%" h="50vh" overflowY="auto" border="1px solid red" mb="5em" mr="0.5em">
          {userFriends.friendlist ? <FriendsList friends={userFriends.friendlist} />
            : <Text>Add a friend!</Text>}
        </Box>
        <Box w="50%" h="50vh" overflowY="auto" border="1px solid red" mb="5em" ml="0.5em">
          <GroupList groups={userGroups} />
        </Box>
      </Flex>
    </Center>
  );
}

export default ProfilePage;

/*

color mode switcher
color mode script

need to handle change of profile banner

need to change from using userid from userinfo to currentuserid from context and do axios requests (cross check for current user id to see if its the current users profile or a friends profile)

when viewing other profile page, banner buttons should show:
  if friends: friends (checkmark)
  if not friends: add as friend

update banner should utilize axios request for update user, just pass in all the redundant information, plus the new url

need to somehow re render the profile page (maybe call one of the context states?) in order to get the friends list to render updated count

*/
