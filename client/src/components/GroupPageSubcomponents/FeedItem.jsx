import React from 'react';
import {
  Box,
  Text,
  HStack,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';

function FeedItem({ event }) {
  function handleEventClick(e) {
    console.log('clicked this event: ', e);
  }

  return (
    <Box
      onClick={() => handleEventClick(event)}
      boxShadow="md"
      rounded="lg"
      mb={4}
      borderWidth="1px"
    >
    {/* <Box bg="lightgreen" onClick={() => handleEventClick(event)}></Box> */}
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          <Image
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            src={ event.picture }
            // alt={ event.eventName }
            p={1}
          />
          <Box p={1} align="left">
            <Text>
              { event.eventName }
            </Text>
            <Text>
              {event.time}
            </Text>
          </Box>
        </Flex>
        {/* { page === 'group'
          && (
          <Flex p={1}>
            <Button size="xs" onClick={() => onInvite(event)}> Invite </Button>
          </Flex>
          ) } */}
      </HStack>
    </Box>
  );
}

export default FeedItem;
