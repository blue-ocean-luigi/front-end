import React, {useState} from 'react';
import {
  Box,
  Button,
  Flex,

} from '@chakra-ui/react';
import FeedItem from './FeedItem';

function GroupFeed() {
  // TODO Replace hardcoded data with axios call
  const [events, setEvents] = useState(
    [
      {
        id: 0,
        eventName: "Monstera Meetup",
        description: "Admire people's monsteras"
      },
      {
        id: 1,
        eventName: "Monstera meetup again",
        description: "Admire people's monsteras again"
      },
      {
        id: 2,
        eventName: "Monstera Meetup yet again",
        description: "Admire people's monsteras yet again"
      },
      {
        id: 3,
        eventName: "Monstera Meetup",
        description: "Admire people's monsteras"
      },
    ],
  );

  function onClick() {
    console.log('clicked button');
  }
  return (
    <Box>
      <Box position="absolute" w="100%" align="center" bg="orange">
        <Box>
          {events.map(e => <FeedItem key={e.id} event={e} />)}
        </Box>
      </Box>
      <Flex position="absolute" bottom={0} w="100%" justifyContent="flex-end" bg="magenta">
        <Button variant="ghost" onClick={onClick}>
          New Event
        </Button>
        <Button variant="ghost" onClick={onClick}>
          New Post
        </Button>
      </Flex>
    </Box>
  );
}

export default GroupFeed;
