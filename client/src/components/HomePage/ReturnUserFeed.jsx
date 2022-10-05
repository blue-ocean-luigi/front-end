import React from 'react';
import { Box } from '@chakra-ui/react';
import HomeFeedPost from './post/HomeFeedPost';

function ReturnUserFeed({ homePosts }) {
  return (
    <Box>
      <Box position="absolute" w="60%" align="center">
        <h1>EXISTING USER</h1>
        {homePosts.map((post, i) => <HomeFeedPost key={i} post={post} />)}
      </Box>
    </Box>
  );
}

export default ReturnUserFeed;
