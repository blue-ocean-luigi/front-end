import React, {useEffect, useState} from 'react';
import { Box } from '@chakra-ui/react';
import './HomeFeedPost.css';
import PostItem from '../../PostItem';
import EventItem from '../../EventItem';
import { UseContextAll } from '../../ContextAll';
import { please } from '../../../request';

function Post({post, updateFeed, events, setEvents}) {
  // function sendComment(comment) {
  //   console.log('in send comment here is the big object: ', comment)
  //   // send post request
  //   please.createComment(comment)
  //     // getPostComments will be a new query from Brian
  //     .then(() => console.log('successfully posted comment'))
  //     .catch((err) => console.log(err));
  // }

  const { userID, userInfo, currentGroupID } = UseContextAll();
  const [rsvps, setRsvps] = useState([]);

  // get number of rsvps
  useEffect(() => {
    please.getRsvp(post.post_id)
      .then((res) => setRsvps(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Box mr={4}>
      {
      post.isevent ? (
        <EventItem
          event={post}
          userID={userID}
          userInfo={userInfo}
          updateFeed={updateFeed}
          rsvps={rsvps}
          setRsvps={setRsvps}
          currentGroupID={currentGroupID}
          events={events}
          setEvents={setEvents}
        />
      ) : (
        <PostItem
          post={post}
          userID={userID}
          userInfo={userInfo}
          updateFeed={updateFeed}
          currentGroupID={currentGroupID}
          events={events}
          setEvents={setEvents}
        />
      )
      }
    </Box>
  );
}
export default Post;
