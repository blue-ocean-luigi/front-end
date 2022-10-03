import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react';

// TODO: Sort group member list such that admins show up at the top of the member list

function onEdit(e) {
  console.log('edited member: ', e);
}

function GroupMember({ member, page, editing }) {
  return (
    <Box bg="brown">
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          <Image
            borderRadius="full"
            boxSize="15%"
            src={ member.profilePicture }
            alt={ member.name }
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
        { page === 'group'
          && editing
          && (
          <Flex p={1}>
            <Button size="xs" onClick={() => onEdit(member)}> Remove </Button>
          </Flex>
          ) }
      </HStack>
    </Box>
  );
}

export default GroupMember;
