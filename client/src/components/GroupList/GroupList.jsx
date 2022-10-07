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
    <Box align="center">
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
      {groups.map((group) => <GroupItem key={group.id} group={group} />)}
    </Box>
  );
}

export default GroupList;
