import React from 'react';
import {
  ChakraProvider,
  Center,
  Flex,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import HomePage from './HomePage';

export default function App() {
  return (
    <ChakraProvider>
      <Center>
        <Flex>
          <Box>
            <Heading>Community Crossing</Heading>
            <Text>Hello, World!</Text>
            <HomePage />
          </Box>
        </Flex>
      </Center>
    </ChakraProvider>
  );
}
