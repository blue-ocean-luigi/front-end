import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

function GroupMember({ member }) {
  return (
    <Box bg="gold">
      { member.name }
    </Box>
  );
}

export default GroupMember;
