import React, {useState} from 'react';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';
import SearchGroup from './GroupPageSubcomponents/SearchGroup';

function GroupPage() {
  const [members, setMembers] = useState(
    [
      { name: 'Amberly', isAdmin: true },
      { name: 'Brian', isAdmin: false },
      { name: 'James', isAdmin: false },
      { name: 'Jessie', isAdmin: false },
      { name: 'Kevin', isAdmin: false },
      { name: 'Matt', isAdmin: false },
    ],
  );
  return (
    <Flex w="100%" justifyContent="right" bg="tomato">
      <VStack w="100%">
        <Flex w="100%" bg="lightpink">
          <Box p={4} w="100%">
            <SearchGroup />
            <Heading mt={1} mb={1}>
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
            <Box p={4} h="100%" w="30%" bg="blue">
              <Button variant="ghost">
                Invite your friends
              </Button>
              <GroupMemberList members={members} />
            </Box>
            <Box p={4} h="100%" w="70%" bg="green">
              <GroupFeed />
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>


  );
}

export default GroupPage;
