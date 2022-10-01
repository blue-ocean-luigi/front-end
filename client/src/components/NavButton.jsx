import React from 'react';
import ColorModeSwitcher from './ColorModeSwitcher';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { logout } from './Auth';

export default function NavButton({setMainDisplay}) {
  return (

    <Menu>
      <MenuButton  variant="ghost" mt="4px" ml="4px" position="fixed" top="0" left="0"as={Button}>Menu</MenuButton>
      <MenuList>
        <MenuItem onClick={() => setMainDisplay('pages')}>Home</MenuItem>
        <MenuItem onClick={() => logout().then(() => setMainDisplay('login'))}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
