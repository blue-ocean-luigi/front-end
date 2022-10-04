import React, { useState } from 'react';
import './App.css';
import {
  ChakraProvider,
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Image,
} from '@chakra-ui/react';
import LoginOption from './LoginOption';
import ColorModeSwitcher from './ColorModeSwitcher';
import PageControl from './PageControl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth';
import ChatBar from './ChatBar';
import NavButton from './NavButton';
import { UseContextAll } from './ContextAll';

import styles from '../style.css';

export default function App() {
  const [userID, setUserID] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const {
    mainPage,
    setMainPage,
    userInfo,
    setUserInfo
  } = UseContextAll();

  return (
    <ChakraProvider>
      <Flex justifyContent="right">
        <ColorModeSwitcher />
      </Flex>
      <Center>
        <Box className="site_banner_container">
          <Box
            className="site_banner_background"
            style={{backgroundImage: 'url(../static/suburb2.png)' }}
          />
          <Box className="site_banner_img">
            <Image
              h="auto"
              w="auto"
              objectFit="fill"
              src="../static/logo2.png"
              alt="Community Crossing"
              marginBottom="1em"
            />
          </Box>
        </Box>
      </Center>
      <div>
        {(() => {
          switch (mainPage) {
            case 'login':
              return <LoginOption
                        setMainDisplay={setMainPage}
                        setUserID={setUserID}
                        user={user}
                        loading={loading}
                        error={error}
                      />;
            case 'pages':
              return <PageControl setMainDisplay={setMainPage} user={userInfo} />;
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
