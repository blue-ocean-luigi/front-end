import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Badge,
  HStack,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

// TODO: Sort group member list such that admins show up at the top of the member list

function onEdit(e) {
  console.log('edited member: ', e);
}

function GroupMember({ member, page, editing, isGroupRequest}) {
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
            { !isGroupRequest
              && member.isAdmin
              && (
              <Badge colorScheme="red">
                Admin
              </Badge>
              )
            }
          </Box>
        </Flex>
        { !isGroupRequest
          && page === 'group'
          && editing
          && (
          <Flex p={1}>
            <ButtonGroup gap="1">
              <Button size="xs" onClick={() => onEdit(member)}> Make Admin </Button>
              <Button size="xs" onClick={() => onEdit(member)}> Remove </Button>
            </ButtonGroup>
          </Flex>
          ) }
        { isGroupRequest
          && page === 'group'
          && editing
          && (
          <Flex p={1}>
            <ButtonGroup gap="1">
              <Button size="xs" onClick={() => onEdit(member)}> Approve </Button>
              <Button size="xs" onClick={() => onEdit(member)}> Deny </Button>
            </ButtonGroup>
          </Flex>
          ) }
      </HStack>
    </Box>
  );
}

export default GroupMember;
