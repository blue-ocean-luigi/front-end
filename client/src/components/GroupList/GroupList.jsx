import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import GroupItem from './GroupItem';
import { UseContextAll } from '../ContextAll';

function GroupList({ groups }) {
  const { mainPage } = UseContextAll();
  return (
    <Box overflow="hidden" width="95%" maxHeight="500px" position="relative" align="center">
      {mainPage === 'home' && (
      <Heading mb={1} fontSize="xl">
        Your Groups
      </Heading>
      )}
      {mainPage === 'profile' && (
      <Heading mb={1} fontSize="xl">
        Groups
      </Heading>
      )}
      <Box align="center" width="105%" overflowY="scroll" maxHeight="500px" paddingRight="15px">
        {groups.map((group) => <GroupItem key={group.id} group={group} />)}
      </Box>
    </Box>
  );
}

export default GroupList;
