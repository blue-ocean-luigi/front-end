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
  const { setMainPage, setCurrentUserID, userID } = UseContextAll();

  function handleSwitch() {
    setCurrentUserID(userID);
    setMainPage('profile');
  }
  return (

    <Menu zIndex={9999}>
      <MenuButton  zIndex={9999} backgroundColor="#f7d359" mt="4px" ml="4px" position="fixed" top="0" left="0"as={Button}>Menu</MenuButton>
      <MenuList zIndex={9999}>
        <MenuItem zIndex={9999} onClick={() => setMainPage('home')}>Home</MenuItem>
        <MenuItem zIndex={9999} onClick={() => handleSwitch()}>Profile</MenuItem>
        <MenuItem zIndex={9999} onClick={() => logout().then(() => { setMainPage('login'); setUserInfo({}); })}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
