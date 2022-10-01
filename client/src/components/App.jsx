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
import ColorModeSwitcher from './ColorModeSwitcher';
import PageControl from './PageControl';
import styles from '../style.css';

export default function App() {
  const [mainDisplay, setMainDisplay] = useState('login');
  const [userID, setUserID] = useState('');
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
            // case 'login':
            //   return <LoginOption setMainDisplay={setMainDisplay} setUserID={setUserID} />;
            case 'pages':
              return <PageControl setMainDisplay={setMainDisplay} userId={userID} />;
            default:
              return <PageControl setMainDisplay={setMainDisplay} userId={userID} />;
              // return <Logo/>; //  or som kind of load screen. This for option loading page
          }
        })()}
      </div>
    </ChakraProvider>
  );
}
