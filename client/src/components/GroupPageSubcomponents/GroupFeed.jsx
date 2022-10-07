import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import NewEvent from '../Modals/NewEvent';
import NewPost from '../Modals/NewPost';
import HomeFeedPost from '../HomePage/post/HomeFeedPost';

function GroupFeed({events, setEvents, updateFeed}) {
  console.log('HAI IN GROUP FEED HERE IS SETEVENTS: ', setEvents)

  return (
    <Box>
      <Flex position="absolute" top={0} w="100%" justifyContent="flex-end">
        <NewPost updateFeed={updateFeed}/>
        <NewEvent updateFeed={updateFeed}/>
      </Flex>
      <Box position="relative" w="100%" align="center" mt={10}>
        <Box mr={4}>
          {events.map((event) => <HomeFeedPost key={event.name} post={event} updateFeed={updateFeed} events={events} setEvents={setEvents}/>)}
        </Box>
      </Box>

    </Box>
  );
}

export default GroupFeed;
