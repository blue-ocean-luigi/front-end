import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { UseContextAll } from './ContextAll';
import { please } from '../request';
import axios from 'axios';

const IMGBB_API_KEY = 'c29851f6cb13a79e0ff41dd116782a2f';


function Welcome() {
  const {
    setUserInfo,
    userInfo,
    setUserID,
    setUserGroups,
    setUserFriends,
    setMainPage} = UseContextAll();
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
        type === 'photo' ? setPhotoURL(response.data.data.display_url) : setBannerURL(response.data.data.display_url) ;
        console.log(response.data.data.display_url);
        //updateUser: (firstname, lastname, email, aboutme, picture, user_id, banner)
        //please.updateUser(userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.aboutme, userInfo.picture, userInfo.id, response.data.data.display_url).then((data)=> console.log(data))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  //addUser: (firstname, lastname, email, aboutme, picture, banner)
    please.addUser(firstname.current.value, lastname.current.value, userInfo.email, aboutme.current.value,  photoURL, bannerURL).then(d => { setUserInfo({...userInfo, id: d.data.id}); setUserID(d.data.id);}).then(() => setMainPage('home'));
  };

  return (
    <div>
      <h1>Welcome to Community Crossing</h1>
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
        <Input type="submit" value="Finish account setup!" />
      </form>
    </div>
  );
}

export default Welcome;
