import React from 'react';
import { Box } from '@chakra-ui/react';
import './HomeFeedPost.css';
import PostItem from '../../PostItem';
import EventItem from '../../EventItem';
import { UseContextAll } from '../../ContextAll';
import { please } from '../../../request';

function Post({post, sendComment}) {
  // console.log('this is post')
  // function sendComment(comment) {
  //   console.log('in send comment here is the big object: ', comment)
  //   // send post request
  //   please.createComment(comment)
  //     // getPostComments will be a new query from Brian
  //     .then(() => console.log('successfully posted comment'))
  //     .catch((err) => console.log(err));
  // }

  // TODO uncomment the context stuff once we get it working
  const { userID, userInfo } = UseContextAll();
  return (
    <Box mr={4}>
      {
      post.isevent ? (
        <EventItem
          event={post}
          userID={userID}
          userInfo={userInfo}
          sendComment={sendComment}
        />
      ) : (
        <PostItem
          post={post}
          userID={userID}
          userInfo={userInfo}
          sendComment={sendComment}
        />
      )
      }
    </Box>
  );
}
export default Post;
