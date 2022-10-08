import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { UseContextAll } from './ContextAll';
import { please } from '../request';

const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';

function Welcome() {
  const {
    setUserInfo,
    userInfo,
    setUserID,
    setUserGroups,
    setUserFriends,
    setMainPage,
    user,
  } = UseContextAll();
  const firstname = useRef();
  const lastname = useRef();
  const [photoURL, setPhotoURL] = useState('');
  const [bannerURL, setBannerURL] = useState('');
  const aboutme = useRef();

  function handlePhoto(e, type) {
    const body = new FormData();
    body.set('key', IMGBB_API_KEY);
    body.append('image', e.target.files[0]);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((response) => {
        if (type === 'photo') {
          setPhotoURL(response.data.data.display_url);
        } else {
          setBannerURL(response.data.data.display_url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    please.addUser(firstname.current.value, lastname.current.value, userInfo.email, aboutme.current.value,  photoURL, bannerURL).then(d => { setUserInfo({...userInfo, id: d.data.id}); setUserID(d.data.id);}).then(() => setMainPage('home')).then(() => {
      please.getUserByEmail(user.email)
        .then((res) => {
          setUserInfo(res.data.info);
          setUserID(res.data.info.id);
          setUserGroups(res.data.groups);
          setUserFriends(res.data.friends);
          setMainPage('home');
        })

    });
  };

  return (
    <Flex w="100%" justifyContent="space-evenly" >
      <Box w="50%">
        <Text fontSize="4xl" textAlign="center">Welcome to Community Crossing</Text>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input ref={firstname} type="text" />
            <FormLabel>Last Name</FormLabel>
            <Input ref={lastname} type="text" />
            <FormLabel>Upload a profile photo</FormLabel>
            <Input type="file" onChange={(e) => handlePhoto(e, 'photo')} />
            <FormLabel>Upload a banner for your profile</FormLabel>
            <Input type="file" onChange={(e) => handlePhoto(e, 'banner')} />
            <FormHelperText> Accepted file forms: jpeg, png</FormHelperText>
            <FormLabel>Tell your community a little bit about yourself</FormLabel>
            <Textarea ref={aboutme} />
          </FormControl>
          <Input backgroundColor="#f7d359" type="submit" value="Finish account setup!" />
        </form>
      </Box>
    </Flex>
  );
}

export default Welcome;
