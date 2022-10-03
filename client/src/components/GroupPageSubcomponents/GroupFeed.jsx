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
        description: "Admire people's monsteras",
        time: "12PM-3PM",
        picture: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/319725_1100-800x825.jpg",
      },
      {
        id: 1,
        eventName: "Monstera meetup again",
        description: "Admire people's monsteras again",
        time: "12PM - 5PM",
        picture: "https://www.willhiteseed.com/assets/images/products/0315-large.jpg",
      },
      {
        id: 2,
        eventName: "Monstera Meetup yet again",
        description: "Admire people's monsteras yet again",
        time: "",
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtYa4VW-7zI-UL564n3GZub9m6mK1L6aibg&usqp=CAU"
      },
      {
        id: 3,
        eventName: "Monstera Meetup",
        description: "Admire people's monsteras"
      },
    ],
  );

  function handleClick() {
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
        <Button variant="ghost" onClick={handleClick}>
          New Event
        </Button>
        <Button variant="ghost" onClick={handleClick}>
          New Post
        </Button>
      </Flex>
    </Box>
  );
}

export default GroupFeed;
