import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import NewEvent from '../Modals/NewEvent';
import NewPost from '../Modals/NewPost';
import HomeFeedPost from '../HomePage/post/HomeFeedPost';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';

function GroupFeed({events, setEvents, updateFeed}) {
  // TODO Replace hardcoded data with axios call
  const { currentGroupID } = UseContextAll();
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   please.getGroupPosts(currentGroupID)
  //     .then((res) => setEvents(res.data))
  //     .catch((err) => console.log(err));
  // }, [currentGroupID]);

  // function updateFeed() {
  //   please.getGroupPosts(currentGroupID)
  //     .then((res) => setEvents(res.data))
  //     .catch((err) => console.log(err));
  // }

  return (
    <Box>
      <Flex position="absolute" top={0} w="100%" justifyContent="flex-end">
        <NewPost updateFeed={updateFeed}/>
        <NewEvent updateFeed={updateFeed}/>
      </Flex>
      <Box position="relative" w="100%" align="center" mt={10}>
        <Box mr={4}>
          {events.map((event) => <HomeFeedPost key={event.name} post={event} updateFeed={updateFeed}/>)}
        </Box>
      </Box>

    </Box>
  );
}

export default GroupFeed;
