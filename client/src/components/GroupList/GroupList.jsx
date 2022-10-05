import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import GroupItem from './GroupItem';

// TODO: edit the hook to work for page control????

function GroupList({ groups, page }) {
  return (
    <Box align="center">
      <Heading mb={1} fontSize="xl">
        Your Groups
      </Heading>
      {groups.map((group) => <GroupItem key={group.id} group={group} page={page} />)}
    </Box>
  );
}

export default GroupList;
