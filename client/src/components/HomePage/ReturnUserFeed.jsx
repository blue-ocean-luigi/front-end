import React from 'react';
import { Box } from '@chakra-ui/react';
import HomeFeedPost from './post/HomeFeedPost';
import { UseContextAll } from '../ContextAll';
import { please } from '../../request';

function ReturnUserFeed() {
  const { userID, homePosts, setHomePosts} = UseContextAll();

  // function sendCommentHome(comment) {
  //   console.log('in send comment here is the big object: ', comment)
  //   // send post request
  //   please.createComment(comment)
  //     // getPostComments will be a new query from Brian
  //     .then(() => please.getUserPosts(userID))
  //     .catch((err) => console.log(err));
  // }

  return (
    <Box>
      <Box position="absolute" w="60%" align="center">
        {homePosts.map((post, i) => <HomeFeedPost key={i} post={post} events={homePosts} setEvents={setHomePosts} />)}
      </Box>
    </Box>
  );
}

export default ReturnUserFeed;
