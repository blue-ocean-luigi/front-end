import React, {useState} from 'react';
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
import { please } from '../request';

function GroupPage({ page }) {
  console.log('this is page in group page: ', page)

  // TODO: replace the isAdmin hook w data from auth
  const [isGroupAdmin, setGroupAdmin] = useState(true);

  // TODO: remove members/setMembers from this page and replace with axios call later
  const [members, setMembers] = useState(
    [
      { name: 'Amberly', isAdmin: true, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Brian', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'James', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
      { name: 'Jessie', isAdmin: false, profilePicture: "https://bit.ly/dan-abramov" },
    ],
  );

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
              Plant Loverz
            </Heading>
            <Text fontSize="xl">
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
              A safe space for all planty talk
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
              <GroupMemberList members={members} page={page} />
            </Box>
            <Divider orientation="vertical" />
            <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%">
            {/* <Box p={1} position="relative" overflow-y="auto" h="100%" w="70%" bg="green"></Box> */}
              <GroupFeed />
            </Box>
          </HStack>
        </Flex>
      </VStack>
    </Flex>

  );
}

export default GroupPage;
