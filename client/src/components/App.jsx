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
import LoginOption from './LoginOption';
import ColorModeSwitcher from './ColorModeSwitcher';
import PageControl from './PageControl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth';
import ChatBar from './ChatBar';
import NavButton from './NavButton';

import styles from '../style.css';

export default function App() {
  const [mainDisplay, setMainDisplay] = useState('login');
  const [userID, setUserID] = useState('');
  const [user, loading, error] = useAuthState(auth);
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
          switch (mainDisplay) {
             case 'login':
               return <LoginOption
                        setMainDisplay={setMainDisplay}
                        setUserID={setUserID}
                        user={user}
                        loading={loading}
                        error={error}
                      />;
            case 'pages':
              return <PageControl setMainDisplay={setMainDisplay} userId={userID} />;
            default:
              return <PageControl setMainDisplay={setMainDisplay} userId={userID} />;
              // return <Logo/>; //  or som kind of load screen. This for option loading page
          }
        })()}
      </div>
      { user ? <NavButton setMainDisplay={setMainDisplay}/> : null }
      { user ? <ChatBar /> : null }
    </ChakraProvider>
  );
}
