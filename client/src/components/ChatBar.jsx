import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Center,
  Input,
  FormControl,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

export default function ChatBar() {
  return (
    <Box marginBottom="8px" bgColor='primary' position="fixed" bottom="0" left="0" width="100%">
      <Center>
        <Flex w="100%">
          <Center w="100%">
            <Input  ml="4px" mr="4px" placeholder="send a message" variant='filled' />
          </Center>
          <Menu>
            <MenuButton ml="4px" mr="4px" as={Button}>Chat Menu</MenuButton>
            <MenuList>
              <MenuItem>Friends</MenuItem>
              <MenuItem>Something Else...</MenuItem>
              <MenuItem>Lorem Ipsum</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
    </Box>
  )
}
