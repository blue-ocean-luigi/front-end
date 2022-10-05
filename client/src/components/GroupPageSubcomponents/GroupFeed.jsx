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
  const [events, setEvents] = useState([]);
  // [
  //   {
  //     id: 0,
  //     eventName: "Monstera Meetup",
  //     description: "Admire people's monsteras",
  //     time: "12PM-3PM",
  //     picture: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/319725_1100-800x825.jpg",
  //     comments: [{ username: 'Amberly', comment: 'I am so in!', createdAt: '12PM' }, { username: 'Jessie', comment: 'Count me in too!', createdAt: '1PM' }],
  //   },
  //   {
  //     id: 1,
  //     eventName: "Monstera meetup again",
  //     description: "Admire people's monsteras again",
  //     time: "12PM - 5PM",
  //     picture: "https://www.willhiteseed.com/assets/images/products/0315-large.jpg",
  //     comments: [{ username: 'Kevin', comment: 'Sorry, I have to build a backend :(', createdAt: '12PM' }, { username: 'Brian', comment: 'Yeah, me too :( Maybe next time.', createdAt: '12PM' }],
  //   },
  //   {
  //     id: 2,
  //     eventName: "Monstera Meetup yet again",
  //     description: "Admire people's monsteras yet again",
  //     time: "",
  //     picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtYa4VW-7zI-UL564n3GZub9m6mK1L6aibg&usqp=CAU",
  //     comments: [],
  //   },
  //   {
  //     id: 3,
  //     eventName: "Monstera Meetup",
  //     description: "Admire people's monsteras",
  //     comments: [],
  //   },
  // ],

  function handleClick() {
    console.log('clicked button');
  }
  return (
    <Box>
      <Box position="absolute" w="100%" align="center">
        <Box mr={4}>
          {events.map(event => <EventItem key={event.id} event={event} />)}
        </Box>
        <PostItem />
      </Box>
      <Flex position="absolute" top={0} w="100%" justifyContent="flex-end" bg="magenta">
        <NewPost />
        <NewEvent />
      </Flex>
    </Box>
  );
}

export default GroupFeed;
