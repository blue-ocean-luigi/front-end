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
import { UseContextAll } from './ContextAll';

export default function NavButton() {
  const { setMainPage, page} = UseContextAll();
  return (

    <Menu zIndex={9999}>
      <MenuButton  zIndex={9999} variant="ghost" mt="4px" ml="4px" position="fixed" top="0" left="0"as={Button}>Menu</MenuButton>
      <MenuList zIndex={9999}>
        <MenuItem zIndex={9999} onClick={() => setMainPage('home')}>Home</MenuItem>
        <MenuItem zIndex={9999} onClick={() => setMainPage('profile')}>Profile</MenuItem>
        <MenuItem zIndex={9999} onClick={() => setMainPage('group')}>Your Groups</MenuItem>
        <MenuItem zIndex={9999} onClick={() => logout().then(() => { setMainPage('login'); setUserInfo({}); })}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
