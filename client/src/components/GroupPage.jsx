import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text
} from '@chakra-ui/react';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';

function GroupPage() {
  return (
    <Flex w="100%" justifyContent="right">
      <VStack w="90%">
        <Flex w="100%" bg="tomato">
          <VStack>
            <Box>
              <Box>Search bar here</Box>
              <Text>Plant Loverz</Text>
              <Text>A safe space for all planty talk</Text>
            </Box>
          </VStack>
        </Flex>
        <Flex w="100%">
          <HStack w="100%">
            <Box w="30%" bg="blue">
              <GroupMemberList />
            </Box>
            <Box w="70%" bg="green">
              <GroupFeed />
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>


  );
}

export default GroupPage;
