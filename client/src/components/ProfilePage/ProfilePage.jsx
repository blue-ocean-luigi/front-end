import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MdBuild, MdInsertPhoto } from 'react-icons/md';
import { UseContextAll } from '../ContextAll';
import './ProfilePage.css';
import FriendRequests from '../Modals/FriendRequests';
import FriendsList from '../FriendsListSubcomponents/FriendsList';
import GroupList from '../GroupList/GroupList';
import RequestFriend from './RequestFriend';
import BioUpdate from '../Modals/BioUpdate';
import { please } from '../../request';

function ProfilePage() {
  const defaultBackgroundImage = 'https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg';
  const defaultProfilePic = 'https://i.pinimg.com/736x/50/d8/03/50d803bda6ba43aaa776d0e243f03e7b.jpg';

  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
    userID,
    currentUserID,
  } = UseContextAll();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [banner, setBanner] = useState('');
  const [pic, setPic] = useState('');
  const [bio, setBio] = useState('');
  const [isMyprofile, setMyProfile] = useState(true);
  const [profileFriends, setProfileFriends] = useState([]);
  const [profileGroups, setProfileGroups] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [profileReqests, setProfileRequests] = useState([]);

  useEffect(() => {
    //  set banner to the one in db if it exists, otherwise use def
    console.log(userID, currentUserID);
    if (userID === currentUserID) {
      setMyProfile(true);
      please.getUserByID(userID)
        .then((response) => {
          console.log(response.data);
          setBio(response.data.info.aboutme);
          setProfileInfo(response.data.info);
          setProfileFriends(response.data.friends.friendlist);
          setProfileGroups(response.data.groups);
          setProfileRequests(response.data.friends.requestlist);
          setBanner(response.data.info.banner);
          setPic(response.data.info.picture);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMyProfile(false);
      please.getUserByID(currentUserID)
        .then((response) => {
          console.log(response.data);
          setBio(response.data.info.aboutme);
          setProfileInfo(response.data.info);
          setProfileFriends(response.data.friends.friendlist);
          setProfileGroups(response.data.groups);
          setProfileRequests(response.data.friends.requestlist);
          setBanner(response.data.info.banner);
          setPic(response.data.info.picture);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUserID, userFriends]);

  const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';

  function handlePhoto(e) {
    const body = new FormData();
    body.set('key', IMGBB_API_KEY);
    body.append('image', e.target.files[0]);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((response) => {
        console.log(response.data.data.display_url);

        if (e.target.id === "ban_up") {
          console.log('banner upload')
          setBanner(response.data.data.display_url);
          please.updateUser(userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.aboutme, userInfo.picture, userInfo.id, response.data.data.display_url).then((data)=> console.log(data))
        }
        if (e.target.id === "pic_up") {
          console.log("pic upload")
          setPic(response.data.data.display_url)
          please.updateUser(userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.aboutme, response.data.data.display_url, userInfo.id, userInfo.banner).then((data)=>console.log(data))
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleBannerClick(e, type) {
    type === "ban" ?
    document.getElementById('ban_up').click() :
    document.getElementById('pic_up').click()
  }

  return (
    <Center display="flex" flexDirection="column">
      <Box backgroundImage={`url(${banner || defaultBackgroundImage})`} backgroundSize="cover" backgroundPosition="center" w="80%" h="40vh" minHeight="20vw" position="relative" m="1em">
        <Box position="absolute" right="5" top="5%" zIndex="2" cursor="pointer">
          {isMyprofile && (
          <FriendRequests
            requests={profileReqests}
          />
          )}
          {!isMyprofile && (
          <RequestFriend />
          )}
        </Box>
        {isMyprofile && (
        <InputGroup w="100%" position="absolute" right="5" bottom="5%">
          <Input type="file" id="ban_up" display="none" onChange={(e) => { handlePhoto(e); }} />
          <Input type="file" id="pic_up" display="none" onChange={(e) => { handlePhoto(e); }} />
          <Button background="rgba(250,250,250,1)" color="blue.500" position="absolute" right="0" bottom="5%" rightIcon={<MdInsertPhoto />} onClick={(e) => handleBannerClick(e, 'ban')}>Update Banner</Button>
          <Button color="blue.300" background="transparent" position="absolute" left="6vw" transform="translateY(-5px)" rightIcon={<MdInsertPhoto />} onClick={(e) => handleBannerClick(e, 'pic')} zIndex="5" size="m">Update Picture</Button>
        </InputGroup>
        )}
        <Center w="20vw" h="100%" position="relative" background="rgba(0 , 0, 0, 0.6)" borderRadius="0 10px 10px 0">
          <Image src={pic || defaultProfilePic} boxSize="15vw" borderRadius="full" position="absolute" top="calc((100% - 13vw) / 2)" alt="PIC" border="3px solid" borderColor="blue.300" />
          <Text w="100%" zIndex="2" position="absolute" left="0" textAlign="center" top="calc((100% - 20vw) / 2)" fontSize="2em" color="blue.300">{`${profileInfo.firstname} ${profileInfo.lastname}`}</Text>
        </Center>
      </Box>
      <Box minHeight="20vh" w="80%" border="1px solid gray" mb="1em" position="relative">
        <Text fontSize="2em">About Me</Text>
        <Text fontSize="1.2em">{bio || 'This user has not filled out their bio :('}</Text>
        {isMyprofile && (
        <BioUpdate updateBio={setBio} onClose={onClose} onOpen={onOpen} isOpen={isOpen} />)}
      </Box>
      <Flex flexDirection="row" w="80%" justifyContent="space-evenly">
        <Box w="50%" h="50vh" overflowY="auto" border="1px solid red" mb="5em" mr="0.5em">
          {profileFriends ? <FriendsList friends={profileFriends} />
            : <Text> No friends to view </Text>}
        </Box>
        <Box w="50%" h="50vh" overflowY="auto" border="1px solid red" mb="5em" ml="0.5em">
          {profileGroups && <GroupList groups={profileGroups} />}
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

        <InputGroup position="absolute" r="5" b="5%" w="15vw">
          <InputLeftElement children={<MdInsertPhoto />} />
          <Input type="file"  onChange={(e)=>console.log(e.target)} />
        </InputGroup>

*/
