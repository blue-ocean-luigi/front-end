import React, {useState, useEffect} from 'react';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
  Button,
  Divider,
} from '@chakra-ui/react';
import {
  useDisclosure,
} from '@chakra-ui/react';
import { UseContextAll } from './ContextAll';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';
import SearchGroup from './GroupPageSubcomponents/SearchGroup';
import InviteFriends from './GroupPageSubcomponents/InviteFriends';
import AdminEditMembers from './GroupPageSubcomponents/AdminEditMembers';
import RequestToJoinGroup from './GroupPageSubcomponents/RequestToJoinGroup';
import { please } from '../request';

function GroupPage() {
  const {
    userID,
    userGroups,
    userInfo,
    userFriends,
    setMainPage,
    currentGroupID,
  } = UseContextAll();

  // state to store all group info for group page
  const [groupInfo, setGroupInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [isGroupAdmin, setGroupAdmin] = useState(false);
  const [inGroup, setInGroup] = useState(false);
  const [memberRequests, setMemberRequests] = useState([]);

  // on load of group, get all group page info
  useEffect(() => {
    please.getGroupInfo(currentGroupID)
      .then((res) => {
        setGroupInfo(res.data);
        setMembers(res.data.members);
      })
      .catch((err) => console.log(err));
  }, [currentGroupID]);

  // on load of group, check if the current user gets admin control

  useEffect(() => {
    const pos = userGroups.map(g => g.id).indexOf(currentGroupID);
    if (
      // in group and admin
      userGroups.filter((g) => g.id === currentGroupID).length > 0
      && userGroups[pos].admin
    ) {
      // console.log('DEBUG in group AND admin')
      setInGroup(true);
      setGroupAdmin(true);
    } else if (
      // not admin but in group
      userGroups.filter((g) => g.id === currentGroupID).length > 0
      && !userGroups[pos].admin) {
      // console.log('DEBUG in group but not admin here is userInfo: ', userInfo)
      setInGroup(true);
      setGroupAdmin(false);
    } else {
      // not admin and not in group
      // console.log('DEBUG not in group nor admin')
      setInGroup(false);
    }
  }, [userGroups, currentGroupID]);

  function handleEditMembers() {
    please.getOpenGroupRequest(currentGroupID)
      .then((results) => {
        setMemberRequests(results.data);
      })
      .catch((err) => console.log(err));
  }

  // GROUP FEED
  const [events, setEvents] = useState([]);

  useEffect(() => {
    please.getGroupPosts(currentGroupID)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [currentGroupID]);

  function updateFeed() {
    please.getGroupPosts(currentGroupID)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }


  // admin editing of members
  function handleMemberStatus(e, status) {
    console.log('DEBUG made it into handleMemberStatus')
    if (status === 'approve') {
      please.acceptGroupRequest(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
    } else if (status === 'deny') {
      please.denyGroupRequest(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => {
          setMembers(res.data.members);
          const removedPos = members.map((m) => m.id).indexOf(e.id);
          const updatedReq = members.splice(removedPos, 1);
          setMemberRequests(updatedReq);
        })
        .catch((err) => console.log(err));
    } else if (status === 'adminify') {
      please.giveMemberAdminStatus(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
    } else {
      console.log('DEBUG preparing to remove');
      please.removeGroupMember(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log('DEBUG did not deny:', err))
    }
  }
  // hook for handling friendsList modal
  const {
    isOpen: isOpenFriendsList,
    onOpen: onOpenFriendsList,
    onClose: onCloseFriendsList,
  } = useDisclosure();

  const {
    isOpen: isOpenAdminControl,
    onOpen: onOpenAdminControl,
    onClose: onCloseAdminControl,
  } = useDisclosure();

  const {
    isOpen: isOpenGroupRequest,
    onOpen: onOpenGroupRequest,
    onClose: onCloseGroupRequest,
  } = useDisclosure();

  // hook for handling whether the admin is editing the members
  const [editing, setEditing] = useState(false);

  return (
    <Flex h="100vh" w="100%" justifyContent="space-between">
      <VStack p={2} h="100vh" w="100%" gap={2}>
        <Flex h="fit-content" w="100%">
          <Box p={2} w="100%">
            <SearchGroup />
            <Heading mt={4} mb={1}>
              {groupInfo.name}
            </Heading>
            <Text fontSize="xl">
              {groupInfo.about}
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Flex bottom={0} h="100%" w="100%">
          <HStack h="100%" w="100%">
            <Box
              h="100%"
              w="30%"
              rounded="lg"
              p={1}
            >
              <Flex mb={1} justifyContent="space-between">
                {
                  inGroup
                  && (
                  <>
                    <Button
                      size="xs"
                      onClick={onOpenFriendsList}
                    >
                      Invite your friends
                    </Button>
                    <InviteFriends
                      onClose={onCloseFriendsList}
                      isOpen={isOpenFriendsList}
                      members={members}
                    />
                  </>
                  )
                }
                {
                  isGroupAdmin
                  && (
                    <>
                      <Button
                        size="xs"
                        onClick={() => {
                          setEditing(true);
                          onOpenAdminControl();
                          handleEditMembers(currentGroupID);
                        }}
                      >
                        Edit Members
                      </Button>
                      <AdminEditMembers
                        onClose={onCloseAdminControl}
                        isOpen={isOpenAdminControl}
                        members={members}
                        memberRequests={memberRequests}
                        editing={editing}
                        handleMemberStatus={handleMemberStatus}
                        isGroupAdmin={isGroupAdmin}
                      />
                    </>
                  )
                }
              </Flex>
              {
                inGroup && <GroupMemberList members={members} />
              }
              {
                !inGroup
                && (
                  <Box ml={1} align="center">
                    <Heading mb={1} fontSize="xl">
                      Members
                    </Heading>
                    Sorry, member lists are only viewable to members of the group
                  </Box>
                )
              }

            </Box>
            <Divider orientation="vertical" />
            <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%">
              {
                inGroup
                && <GroupFeed userID={userID} groupID={currentGroupID} events={events} updateFeed={updateFeed}/>
              }
              {
                !inGroup
                && (
                  <Box>
                    <Box position="absolute" w="100%" align="center">
                      <Box mr={4} mb={4}>
                        Sorry, group feeds are only viewable to members of the group
                      </Box>
                      <Button
                        width="50%"
                        onClick={onOpenGroupRequest}
                      >
                        Join
                        {groupInfo.name}
                      </Button>
                      <RequestToJoinGroup
                        onClose={onCloseGroupRequest}
                        isOpen={isOpenGroupRequest}
                        groupInfo={groupInfo}
                      />
                    </Box>
                  </Box>
                )
              }
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>

  );
}

export default GroupPage;
