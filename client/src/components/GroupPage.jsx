import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';
import SearchGroup from './GroupPageSubcomponents/SearchGroup';

function GroupPage() {
  return (
    <Flex w="100%" justifyContent="right">
      <VStack w="90%">
        <Flex w="100%" bg="lightpink">
          <Box p={2} w="100%">
            <SearchGroup />
            <Heading mt={2} mb={2}>
              Plant Loverz
            </Heading>
            <Text fontSize="xl">
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
            </Text>
          </Box>
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
