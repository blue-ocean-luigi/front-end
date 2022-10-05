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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { UseContextAll } from './ContextAll';
import GroupFeed from './GroupPageSubcomponents/GroupFeed';
import GroupMemberList from './GroupPageSubcomponents/GroupMemberList';
import SearchGroup from './GroupPageSubcomponents/SearchGroup';
import InviteFriends from './GroupPageSubcomponents/InviteFriends';
import AdminEditMembers from './GroupPageSubcomponents/AdminEditMembers';
import RequestToJoinGroup from './GroupPageSubcomponents/requestToJoinGroup';
import { please } from '../request';

function GroupPage({ page, userID, groupID = 1 }) {
  console.log('here is group page: ', groupID);

  // const { userGroups, userInfo, userFriends } = UseContextAll();

  // state to store all group info for group page
  const [groupInfo, setGroupInfo] = useState({}); // can delete once context is working

  // edit these once verify on context
  // const [userInfo, setUserInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [isGroupAdmin, setGroupAdmin] = useState(true);
  const [inGroup, setInGroup] = useState(true);

  // on load of group, get all group page info
  useEffect(() => {
    please.getGroupInfo(1)
    .then((res) => {
      setGroupInfo(res.data);
      setMembers(res.data.members);
    })
    .catch((err) => console.log(err))
  }, [groupID])

  console.log('this is group info: ', groupInfo)

  // on load of group, check if the current user gets admin control

  // useEffect((groupInfo) => {
  //   console.log('this is groupInfo: ', groupInfo)
  //   please.getUserByID(1)
  //   .then((res) => {
  //     // check if user is in the group AND if they are an admin
  //     // if admin, show admin panel
  //     // if not admin but in group, show normal view
  //     // if not admin and not in group, WHAT DO I SHOW???
  //       // SHOW ERROR PAGE in feed and members and add a button that directs them to request
  //     const pos = res.data.groups.map(g => g.name).indexOf(groupInfo.name);
  //     console.log('this is group name: ', groupInfo.name)
  //     console.log('this is pos: ', res.data.groups.map(g => g.name))
  //     if (
  //       // admin and in group
  //       res.data.groups.filter(g => g.name === groupInfo.name).length > 0
  //       &&
  //       res.data.groups[pos]['admin']
  //       ) {
  //       setInGroup(true);
  //       setGroupAdmin(true);
  //       setUserInfo(res.data);
  //     }
  //     else if (
  //       // not admin but in group
  //       res.data.groups.filter(g => g.name === groupInfo.name).length > 0
  //       &&
  //       !res.data.groups[pos]['admin']
  //       ) {
  //         setInGroup(true);
  //         setUserInfo(res.data);
  //         // setGroupAdmin(false); //don't think i need this bc redundant
  //       }
  //     else {
  //       // not admin and not in group
  //       setInGroup(false);
  //       setUserInfo(res.data);
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }, [userID])




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

  function onClick() {
    console.log('clicked button');
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
    {/* <Flex h="100vh" w="100%" justifyContent="space-between" bg="gray"></Flex> */}
      <VStack p={2} h="100vh" w="100%" gap={2}>
        <Flex h="fit-content" w="100%">
        {/* <Flex h="fit-content" w="100%" bg="lightpink"></Flex> */}
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
            {/* <Box h="100%" w="30%" bg="blue" p={1}> */}
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
                  friends={testFriendList}
                  page={page}
                />
                {
                  isGroupAdmin
                  && (
                    <>
                      <Button
                        size="xs"
                        onClick={() => { setEditing(true); onOpenAdminControl(); }}
                      >
                        Edit Members
                      </Button>
                      <AdminEditMembers
                        onClose={onCloseAdminControl}
                        isOpen={isOpenAdminControl}
                        members={members}
                        memberRequests={memberRequests}
                        page={page}
                        editing={editing}
                      />
                    </>
                  )
                }
              </Flex>
              {
                inGroup &&
                <GroupMemberList members={members} page={page} />
              }
              {
                !inGroup &&
                <Box ml={1} align="center">
                  <Heading mb={1} fontSize="xl">
                    Members
                  </Heading>
                  Sorry, member lists are only viewable to members of the group
                </Box>
              }

            </Box>
            <Divider orientation="vertical" />
            <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%">
            {/* <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%" bg="green"></Box> */}
              {
                inGroup &&
                <GroupFeed />
              }
              {
                !inGroup &&
                <Box>
                  <Box position="absolute" w="100%" align="center">
                    <Box mr={4} mb={4}>
                    Sorry, group feeds are only viewable to members of the group
                    </Box>
                    <Button
                      width="50%"
                      onClick={onOpenGroupRequest}
                    >
                      Join {groupInfo.name}
                    </Button>
                    <RequestToJoinGroup
                      onClose={onCloseGroupRequest}
                      isOpen={isOpenGroupRequest}
                      groupInfo={groupInfo}
                    />
                  </Box>
                  <Flex position="absolute" top={0} w="100%" justifyContent="flex-end" bg="magenta">
                  </Flex>
                </Box>
              }
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>

  );
}

export default GroupPage;
