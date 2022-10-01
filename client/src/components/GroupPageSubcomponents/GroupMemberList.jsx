import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import GroupMember from './GroupMember';
import AdminEditMembers from './AdminEditMembers';

function GroupMemberList({members}) {
  return (
    <Box>
      {members.map((m) => <GroupMember key={m.name} member={m} />)}

    </Box>
  );
}

export default GroupMemberList;
