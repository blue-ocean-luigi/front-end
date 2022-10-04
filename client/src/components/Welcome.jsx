import React, { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';

function Welcome() {
  const firstName = useRef();
  const lastName = useRef();
  const photoURL = useRef();
  const bio = useRef();
  const handleSubmit = () => {
  }
  return (
    <div>
      <h1>Welcome to Community Crossing</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input reftype="text" />
          <FormLabel>Last Name</FormLabel>
          <Input type="text" />
          <FormLabel>Upload a profile photo</FormLabel>
          <Input type="file" />
          <FormHelperText> Accepted file forms: jpeg, png</FormHelperText>
          <FormLabel>Tell your community a little bit about yourself</FormLabel>
          <Textarea />
        </FormControl>
      </form>
    </div>
  );
}

export default Welcome;
