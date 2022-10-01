import React from 'react';
import {
  Box,
  Center,
  Input,
  FormControl,
} from '@chakra-ui/react';

export default function ChatBar() {
  return (
    <Box marginBottom="8px" position="fixed" bottom="0" left="0" width="100%">
      <FormControl>
        <Center>
          <Input placeholder="send a message" variant='filled' width="80%"/>
        </Center>
      </FormControl>
    </Box>
  )
}
