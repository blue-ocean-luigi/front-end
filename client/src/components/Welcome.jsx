import React, { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { UseContextAll } from './ContextAll';
import { please } from '../request';


function Welcome({setMainPage}) {
  const { setUserInfo, userInfo, setUserId, setUserGroups, setUserFriends } = UseContextAll();
  const firstname = useRef();
  const lastname = useRef();
  const photoURL = useRef();
  const aboutme = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      picture: '', // need to tie this in with photobb
      aboutme: aboutme.current.value,
      email: userInfo.email
    };
    console.log(data);
    request.addUser(firstname.current.value, lastname.current.value, userInfo.email, '').then(d => setUserInfo({...userInfo, id: d.data.id})).then(() => setMainPage('home'));
  }
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
          <Input ref={photoURL} type="file" />
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
