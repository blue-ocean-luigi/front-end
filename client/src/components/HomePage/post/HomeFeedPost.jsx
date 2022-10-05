import React from 'react';
import { Box } from '@chakra-ui/react';
import './HomeFeedPost.css';
import PostItem from '../../PostItem';
import EventItem from '../../EventItem';
import { UseContextAll } from '../../ContextAll';

function Post({post, userID=1}) {
  // TODO uncomment the context stuff once we get it working
  // const { userID } = UseContextAll();
  return (
    <Box mr={4}>
      {
      post.isevent ? (
        <EventItem event={post} userID={userID} />
      ) : (
        <PostItem post={post} userID={userID} />
      )
      }
    </Box>
  );
}
export default Post;
