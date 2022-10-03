import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import GroupMember from './GroupMember';
import AdminEditMembers from './AdminEditMembers';

function IncomingGroupRequests({memberRequests, page, editing}) {

  const [isGroupRequest, setIsGroupRequest] = useState(true);

  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Group Requests
      </Heading>
      {memberRequests.map((m) => (
        <GroupMember
          key={m.name}
          member={m}
          page={page}
          editing={editing}
          isGroupRequest={isGroupRequest}
        />
      ))}
    </Box>
  );
}

export default IncomingGroupRequests;
