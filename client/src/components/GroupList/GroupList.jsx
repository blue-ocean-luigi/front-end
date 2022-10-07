import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import GroupItem from './GroupItem';

function GroupList({ groups }) {
  return (
    <Box overflow="hidden" width="95%" maxHeight="500px" position="relative">
      <Box align="center" width="105%" overflowY="scroll" maxHeight="500px" paddingRight="15px">
        {groups.map((group) => <GroupItem key={group.id} group={group} />)}
      </Box>
    </Box>
  );
}

export default GroupList;
