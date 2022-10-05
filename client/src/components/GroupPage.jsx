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

function GroupPage({ page, groupID = 1, userID=1 }) {
  console.log('here is group page: ', groupID);
  console.log('here is userID: ', userID);

  // const { userGroups, userInfo, userFriends } = UseContextAll();

  // TO BE REPLACED BY CONTEXT
  const userInfo = {
      "info": {
          "id": 1,
          "firstname": "Jessie",
          "lastname": "Zhao",
          "email": "email1@gmail.com",
          "aboutme": "Im awesome",
          "picture": "https://static.wikia.nocookie.net/powerrangers/images/6/6a/Mighty_Morphin_Yellow_Ranger_Pose.jpeg/revision/latest?cb=20191209142810"
      },
      "friends": {
          "friendlist": [
              {
                  "firstname": "Amberly",
                  "lastname": "Malone",
                  "id": 2,
                  "picture": "https://static.wikia.nocookie.net/powerrangers/images/d/d1/Mighty_Morphin_Pink_Ranger_Pose.jpeg/revision/latest?cb=20200504011256"
              },
              {
                  "firstname": "James",
                  "lastname": "Stolhammer",
                  "id": 3,
                  "picture": "https://www.looper.com/img/gallery/whatever-happened-to-the-original-green-power-ranger/intro-1601866752.jpg"
              },
              {
                  "firstname": "Matt",
                  "lastname": "Waelder",
                  "id": 5,
                  "picture": "https://static.wikia.nocookie.net/powerrangers/images/d/dc/Mighty_Morphin_Red_Ranger_Pose.jpeg/revision/latest?cb=20200621085736"
              }
          ],
          "requestlist": []
      },
      "groups": [
          {
              "id": 1,
              "name": "DnD",
              "about": "Dungen and Dragons players come forth",
              "state": "San Franisco",
              "city": "CA",
              "zip": 94105,
              "admin": true
          },
          {
              "id": 3,
              "name": "Gardeners",
              "about": "Green Thumbs unite",
              "state": "San Franisco",
              "city": "CA",
              "zip": 94105,
              "admin": false
          }
      ]
  }

  // state to store all group info for group page
  const [groupInfo, setGroupInfo] = useState({});

  // edit these once verify on context
  // const [userInfo, setUserInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [isGroupAdmin, setGroupAdmin] = useState(false);
  const [inGroup, setInGroup] = useState(false);

  // on load of group, get all group page info
  useEffect(() => {
    please.getGroupInfo(1)
      .then((res) => {
        setGroupInfo(res.data);
        setMembers(res.data.members);
      })
      .catch((err) => console.log(err));
  }, [groupID]);

  console.log('this is group info: ', groupInfo);

  // on load of group, check if the current user gets admin control
  useEffect((groupID = 1) => {
    // check if user is in the group AND if they are an admin
    // if admin, show admin panel
    // if not admin but in group, show normal view
    // if not admin and not in group, WHAT DO I SHOW???
    // SHOW ERROR PAGE in feed and members and add a button that directs them to request
    const pos = userInfo.groups.map(g => g.id).indexOf(groupID);
    if (
      // in group and admin
      userInfo.groups.filter((g) => g.id === groupID).length > 0
      && userInfo.groups[pos].admin
    ) {
      setInGroup(true);
      setGroupAdmin(true);
    } else if (
      // not admin but in group
      userInfo.groups.filter((g) => g.id === groupID).length > 0
      && !userInfo.groups[pos].admin) {
      setInGroup(true);
      // setGroupAdmin(false); //don't think i need this bc redundant
    } else {
      // not admin and not in group
      setInGroup(false);
    }
  }, [userInfo]);

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
                inGroup && <GroupMemberList members={members} page={page} />
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
                && <GroupFeed />
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
