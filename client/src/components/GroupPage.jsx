import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Flex,
} from '@chakra-ui/react';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';

function GroupPage() {
  return (
    <VStack>
      <Flex>
        This is Group Page big component!
      </Flex>
      <Flex>
        <HStack>
          <Box>
            <GroupMemberList />
          </Box>
          <Box>
            <GroupFeed />
          </Box>
        </HStack>
      </Flex>
    </VStack>

  );
}

export default GroupPage;
