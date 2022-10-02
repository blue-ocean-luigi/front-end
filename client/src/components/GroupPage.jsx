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
import { UseContextAll } from './ContextAll';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';
import SearchGroup from './GroupPageSubcomponents/SearchGroup';

function GroupPage() {
  // TODO: remove members/setMembers from this page and replace with axios call later
  const [members, setMembers] = useState(
    [
      { name: 'Amberly', isAdmin: true, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Brian', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'James', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Jessie', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Kevin', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Matt', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
    ],
  );

  function onClick() {
    console.log('clicked button');
  }

  return (
    <Flex h="100vh" w="100%" justifyContent="space-between" bg="gray">
      <VStack p={2} h="100vh" w="100%">
        <Flex h="fit-content" w="100%" bg="lightpink">
          <Box p={2} w="100%">
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
        <Flex bottom={0} h="100%" w="100%">
          <HStack h="100%" w="100%">
            <Box h="100%" w="30%" bg="blue" p={1}>
              <Button variant="ghost" onClick={onClick}>
                Invite your friends
              </Button>
              <GroupMemberList members={members} />
            </Box>
            <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%" bg="green">
              <GroupFeed />
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>

  );
}

export default GroupPage;
