import React, {useState} from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';

function GroupItem({ group }) {
  console.log(group);
  const {
    setCurrentGroupID,
    setMainPage,
  } = UseContextAll();

  // on click of group, go to group page
  function handleSelect() {
    // console.log(group.id);
    setCurrentGroupID(group.id);
    setMainPage('group');
  }

  return (
    <Box
      boxShadow="sm"
      rounded="lg"
      mb={1}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left" onClick={() => handleSelect()}>
          <Image
            borderRadius="full"
            boxSize="80px"
            src={ group.picture ? group.picture : 'https://picsum.photos/seed/picsum/200/300' }
            alt={group.name}
            p={1}
          />
          <Box p={1} align="left">
            <Text>
              {group.name}
            </Text>
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
}

export default GroupItem;
