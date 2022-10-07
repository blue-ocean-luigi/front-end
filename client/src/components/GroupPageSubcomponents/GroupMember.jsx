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
import { please } from '../../request'
import {UseContextAll} from '../ContextAll';

// TODO: Sort group member list such that admins show up at the top of the member list

function onEdit(e) {
  console.log('edited member: ', e);
}

// function handleMemberStatus(e, status, currentGroup = 1) {
//   console.log(e)
//   console.log('this is status: ', status)

//   if (status === 'approve') {
//     please.acceptGroupRequest(currentGroup, e.id)
//   } else if (status === 'deny') {
//     please.denyGroupRequest(currentGroup, e.id);
//   } else if (status === 'adminify') {
//     please.giveMemberAdminStatus(currentGroup, e.id);
//   } else {
//     please.removeGroupMember(currentGroup, e.id);
//   }
// }

function GroupMember({ member, editing, isGroupRequest, handleMemberStatus}) {
  const {
    mainPage,
    setMainPage,
    setCurrentUserID
  } = UseContextAll();
  return (
    <Box
      boxShadow="sm"
      rounded="lg"
      mb={1}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          <Image
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            src={ member.picture ? member.picture : 'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k' }
            alt={ `${member.id} ? ""` }
            p={1}
          />
          <Box p={1} align="left">
            <Text>
              { !isGroupRequest
                ? `${member.firstName} ${member.lastName} ` : `${member.firstname} ${member.lastname}` }
            </Text>
            { !isGroupRequest
              && member.admin
              && (
              <Badge colorScheme="red">
                Admin
              </Badge>
              )
            }
            <Text>
              {
                !isGroupRequest ? '' : ` ${member.message} `
              }
            </Text>
          </Box>
        </Flex>
        { !isGroupRequest
          && member.admin
          && mainPage === 'group'
          && editing
          && (
          <Flex p={1}>
            <ButtonGroup gap="1">
              <Button size="xs" onClick={() => handleMemberStatus(member, 'remove')}> Remove </Button>
            </ButtonGroup>
          </Flex>
          ) }
        { !isGroupRequest
          && !member.admin
          && mainPage === 'group'
          && editing
          && (
          <Flex p={1}>
            <ButtonGroup gap="1">
              <Button size="xs" onClick={() => handleMemberStatus(member, 'adminify')}> Make Admin </Button>
              <Button size="xs" onClick={() => handleMemberStatus(member, 'remove')}> Remove </Button>
            </ButtonGroup>
          </Flex>
          ) }
        { isGroupRequest
          && mainPage === 'group'
          && editing
          && (
          <Flex p={1}>
            <ButtonGroup gap="1">
              <Button size="xs" onClick={() => handleMemberStatus(member, 'approve')}> Approve </Button>
              <Button size="xs" onClick={() => handleMemberStatus(member, 'deny')}> Deny </Button>
            </ButtonGroup>
          </Flex>
          ) }
      </HStack>
    </Box>
  );
}

export default GroupMember;
