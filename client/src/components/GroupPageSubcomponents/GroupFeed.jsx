import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import NewEvent from '../Modals/NewEvent';
import NewPost from '../Modals/NewPost';
import HomeFeedPost from '../HomePage/post/HomeFeedPost';
import { please } from '../../request';

function GroupFeed({ groupID = 1 }) {
  // TODO Replace hardcoded data with axios call

  const [events, setEvents] = useState([]);

  useEffect(() => {
    please.getGroupPosts(groupID)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [groupID]);

  return (
    <Box>
      <Box position="absolute" w="100%" align="center">
        <Box mr={4}>
          {events.map((event) => <HomeFeedPost key={event.name} post={event} />)}
        </Box>
      </Box>
      <Flex position="absolute" top={0} w="100%" justifyContent="flex-end">
        <NewPost />
        <NewEvent />
      </Flex>
    </Box>
  );
}

export default GroupFeed;
