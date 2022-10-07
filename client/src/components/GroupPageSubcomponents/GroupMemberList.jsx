import React from 'react';
import {
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import GroupMember from './GroupMember';
import AdminEditMembers from './AdminEditMembers';
import { please } from '../../request';

function GroupMemberList({members, editing, handleMemberStatus}) {
  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Members
      </Heading>
      {members.map((m) => <GroupMember key={m.id} member={m} editing={editing} handleMemberStatus={handleMemberStatus}/>)}
    </Box>
  );
}

export default GroupMemberList;
