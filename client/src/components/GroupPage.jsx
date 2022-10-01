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
    <VStack>
      <Flex bg="tomato">
        <VStack>
          <Box>Search bar here</Box>
          <Text>Plant Loverz</Text>
          <Text>A safe space for all planty talk</Text>
        </VStack>
      </Flex>
      <Flex>
        <HStack>
          <Box bg="blue">
            <GroupMemberList />
          </Box>
          <Box bg="green">
            <GroupFeed />
          </Box>
        </HStack>
      </Flex>
    </VStack>

  );
}

export default GroupPage;
