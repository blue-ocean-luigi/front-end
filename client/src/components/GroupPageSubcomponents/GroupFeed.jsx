import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import NewEvent from '../Modals/NewEvent';
import NewPost from '../Modals/NewPost';
import HomeFeedPost from '../HomePage/post/HomeFeedPost';
import { please } from '../../request';

function GroupFeed({ groupID = 1, userID }) {
  // TODO Replace hardcoded data with axios call

  const [events, setEvents] = useState([]);

  useEffect(() => {
    please.getGroupPosts(groupID)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [groupID]);

  return (
    <Box>
      <Flex position="absolute" top={0} w="100%" justifyContent="flex-end">
        <NewPost />
        <NewEvent />
      </Flex>
      <Box position="relative" w="100%" align="center" mt={10}>
        <Box mr={4}>
          {events.map((event) => <HomeFeedPost key={event.name} post={event} userID={userID}/>)}
        </Box>
      </Box>

    </Box>
  );
}

export default GroupFeed;
