import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import GroupItem from './GroupItem';


function GroupList({ groups}) {
  return (
    <Box align="center">
      <Heading mb={1} fontSize="xl">
        Your Groups
      </Heading>
      {groups.map((group) => <GroupItem key={group.id} group={group} />)}
    </Box>
  );
}

export default GroupList;
