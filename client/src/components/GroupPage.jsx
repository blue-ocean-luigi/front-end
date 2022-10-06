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
  console.log(userInfo);
  // state to store all group info for group page
  const [groupInfo, setGroupInfo] = useState({});

  // edit these once verify on context
  // const [userInfo, setUserInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [isGroupAdmin, setGroupAdmin] = useState(false);
  const [inGroup, setInGroup] = useState(false);

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
    // check if user is in the group AND if they are an admin
    // if admin, show admin panel
    // if not admin but in group, show normal view
    // if not admin and not in group, WHAT DO I SHOW???
    // SHOW ERROR PAGE in feed and members and add a button that directs them to request
    const pos = userGroups.map(g => g.id).indexOf(currentGroupID);
    if (
      // in group and admin
      userGroups.filter((g) => g.id === currentGroupID).length > 0
      && userGroups[pos].admin
    ) {
      setInGroup(true);
      setGroupAdmin(true);
    } else if (
      // not admin but in group
      userGroups.filter((g) => g.id === currentGroupID).length > 0
      && !userGroups[pos].admin) {
      setInGroup(true);
      // setGroupAdmin(false); //don't think i need this bc redundant
    } else {
      // not admin and not in group
      setInGroup(false);
    }
  }, [userGroups, currentGroupID]);

  const [memberRequests, setMemberRequests] = useState(
    [
      { name: 'Kevin', isAdmin: true, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Matt', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
    ],
  );

  const testFriendList = [
    {
      name: 'apple', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'orange', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'banana', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'space shuttle', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'pepper', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'salt', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'grape', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'pear', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'apple1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'orange1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'banana1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'space shuttle1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'pepper1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'salt1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'grape1', profilePicture: "https://bit.ly/dan-abramov"
    },
    {
      name: 'pear1', profilePicture: "https://bit.ly/dan-abramov"
    },
  ];

  function handleEditMembers() {
    console.log('clicked button');
    please.getOpenGroupRequest(currentGroupID)
      .then((results) => {
        console.log('this is requests: ', results.data);
        setMemberRequests(results.data);
      })
      .catch((err) => console.log(err));
  }

  // admin editing of members
  function handleMemberStatus(e, status) {
    console.log(e);
    console.log('this is status: ', status);

    if (status === 'approve') {
      please.acceptGroupRequest(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
    } else if (status === 'deny') {
      please.denyGroupRequest(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
    } else if (status === 'adminify') {
      please.giveMemberAdminStatus(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
    } else {
      please.removeGroupMember(currentGroupID, e.id)
        .then(() => please.getGroupInfo(currentGroupID))
        .then((res) => setMembers(res.data.members))
        .catch((err) => console.log(err));
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
                <Button
                  size="xs"
                  onClick={onOpenFriendsList}
                >
                  Invite your friends
                </Button>
                <InviteFriends
                  onClose={onCloseFriendsList}
                  isOpen={isOpenFriendsList}
                />
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
                && <GroupFeed userID={userID} groupID={currentGroupID} />
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
