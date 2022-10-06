import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import GroupMember from './GroupMember';
import AdminEditMembers from './AdminEditMembers';

function IncomingGroupRequests({memberRequests, editing, handleMemberStatus}) {

  const [isGroupRequest, setIsGroupRequest] = useState(true);

  return (
    <Box ml={1} align="center">
      <Heading mb={1} fontSize="xl">
        Group Requests
      </Heading>
      { memberRequests.length > 0
        ? memberRequests.map((m, i) => (
          <GroupMember
            member={m}
            editing={editing}
            isGroupRequest={isGroupRequest}
            handleMemberStatus={handleMemberStatus}
            key={i}
          />
        )) : 'No group requests'
      }
    </Box>
  );
}

export default IncomingGroupRequests;
