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
  const [page, setPage] = useState('home');
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
              return <PageControl
                user={userInfo}
                page={page}
                setPage={setPage}
                />;
            case 'welcome':
              return <Welcome />;
            default:
              return <PageControl
                user={userInfo}
                page={page}
                setPage={setPage}
                />;
              // return <Logo/>; //  or som kind of load screen. This for option loading page
          }
        })()}
      </div>
      { user ? <NavButton setMainPage={setMainPage} setPage={setPage} /> : null }
      { user ? <ChatBar /> : null }
    </ChakraProvider>
  );
}
