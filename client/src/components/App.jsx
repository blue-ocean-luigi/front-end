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

export default function App() {
  const [mainDisplay, setMainDisplay] = useState('login');
  const [userID, setUserID] = useState('');
  return (
    <ChakraProvider>
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
              return <LoginOption setMainDisplay={setMainDisplay} setUserID={setUserID} />; // James
            case 'pages':
              return <PageControl setMainDisplay={setMainDisplay} userId={userID} />;
            default:
              return <Logo/>; //  or som kind of load screen. This for option loading page
          }
        })()}
      </div>
    </ChakraProvider>
  );
}
