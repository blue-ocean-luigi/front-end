import React, {useEffect, useState} from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
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

  // hook for handling whether the rsvp list is open
  const {
    isOpen: isOpenRsvp,
    onOpen: onOpenRsvp,
    onClose: onCloseRsvp,
  } = useDisclosure();

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
          isOpenRsvp={isOpenRsvp}
          onOpenRsvp={onOpenRsvp}
          onCloseRsvp={onCloseRsvp}
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
