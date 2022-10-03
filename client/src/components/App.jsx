import React, { useState } from 'react';
import './App.css';
import {
  ChakraProvider,
  Center,
  Flex,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import LoginOption from './Auth/LoginOption';
import ColorModeSwitcher from './ColorModeSwitcher';
import PageControl from './PageControl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth/Auth';
import ChatBar from './ChatBar';
import NavButton from './NavButton';
import { UseContextAll } from './ContextAll';
import Welcome from './Welcome';

import styles from '../style.css';

export default function App() {
  const [userID, setUserID] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const {
    mainPage,
    setMainPage,
    userInfo,
    setUserInfo,
  } = UseContextAll();

  return (
    <ChakraProvider>
      <Flex justifyContent="right">
        <ColorModeSwitcher />
      </Flex>
      <Center>
        <Flex>
          <Box>
            <Heading>Community Crossing</Heading>
            <Text>An online community just for communities</Text>
          </Box>
        </Flex>
      </Center>
      <div>
        {(() => {
          switch (mainPage) {
            case 'login':
              return (
                <LoginOption
                  setMainPage={setMainPage}
                  setUserID={setUserID}
                  user={user}
                  loading={loading}
                  error={error}
                />
              );
            case 'pages':
              return <PageControl setMainDisplay={setMainPage} user={userInfo} />;
            case 'welcome':
              return <Welcome />;
            default:
              return <PageControl setMainDisplay={setMainPage} user={userInfo} />;
              // return <Logo/>; //  or som kind of load screen. This for option loading page
          }
        })()}
      </div>
      { user ? <NavButton setMainDisplay={setMainPage} /> : null }
      { user ? <ChatBar /> : null }
    </ChakraProvider>
  );
}
