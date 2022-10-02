import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Badge,
} from '@chakra-ui/react';

function GroupMember({ member }) {
  return (
    <Box bg="gold">
      <Flex justifyContent="left">
        <Image
          borderRadius="full"
          boxSize="15%"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          p={1}
        />
        <Box p={1} align="left">
          <Text>
            { member.name }
          </Text>
          {
            member.isAdmin
            && (
            <Badge colorScheme="red">
              Admin
            </Badge>
            )
          }
        </Box>

      </Flex>

    </Box>
  );
}

export default GroupMember;
