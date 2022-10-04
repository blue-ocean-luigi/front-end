import React, {useState} from 'react';
import {
  Box,
  Button,
  Flex,

} from '@chakra-ui/react';
import FeedItem from './FeedItem';
import NewEvent from '../Modals/NewEvent';
import NewPost from '../Modals/NewPost';
import PostItem from '../PostItem';
import EventItem from '../EventItem';

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
        <PostItem />
        <EventItem />
      </Box>
      <Flex position="absolute" bottom={0} w="100%" justifyContent="flex-end" bg="magenta">
        <NewPost />
        <NewEvent />
      </Flex>
    </Box>
  );
}

export default GroupFeed;
