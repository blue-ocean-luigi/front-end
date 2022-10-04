import React from 'react';
import ColorModeSwitcher from './ColorModeSwitcher';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { logout } from './Auth/Auth';

export default function NavButton({setMainPage, setPage}) {
  return (

    <Menu>
      <MenuButton  variant="ghost" mt="4px" ml="4px" position="fixed" top="0" left="0"as={Button}>Menu</MenuButton>
      <MenuList>
        <MenuItem onClick={() => setPage('home')}>Home</MenuItem>
        <MenuItem onClick={() => setPage('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => setPage('group')}>Your Groups</MenuItem>
        <MenuItem onClick={() => logout().then(() => setMainPage('login'))}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
