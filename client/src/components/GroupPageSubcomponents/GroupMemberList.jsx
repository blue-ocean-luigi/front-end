import React from 'react';
import {
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import GroupMember from './GroupMember';
import AdminEditMembers from './AdminEditMembers';

function GroupMemberList({members}) {
  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Members
      </Heading>
      {members.map((m) => <GroupMember key={m.name} member={m} />)}
    </Box>
  );
}

export default GroupMemberList;
