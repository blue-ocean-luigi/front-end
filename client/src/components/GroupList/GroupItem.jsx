import React, {useState} from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';

function GroupItem({ group, page }) {
  console.log(group);
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
            src={group.picture}
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
