import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';

function Welcome() {
  return (
    <div>
      <h1>Welcome to Community Crossing</h1>
      <FormControl>
        <FormLabel>Upload a profile photo</FormLabel>
        <Input type="file" />
        <FormHelperText> Accepted file forms: jpeg, png</FormHelperText>
        <FormLabel>Tell your community a little bit about yourself</FormLabel>
        <Textarea />
      </FormControl>
    </div>
  );
}

export default Welcome;
