import React, { useState } from 'react';
import { BiHomeSmile, BiMessageAdd } from 'react-icons/bi';
import {
  Textarea,
  Text,
  Stack,
  Icon,
  Button,
  Box,
  HStack,
  Flex,
  Image,
} from '@chakra-ui/react';
import CommentList from './Comments/CommentList';
import { UseContextAll } from './ContextAll';
import { please } from '../request';

function PostItemOld({ post }) {
  console.log('DEBUG in post here is post: ', post)
  const { userID } = UseContextAll();
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(post.postlikes.length);
  // const [requestInFlight, setRequestInFlight] = false;
  // const [meLikey, setMeLikey] = post.postlikes.filter(u => u.id === userID).length > 0;
  var requestInFlight = false;

  function sendComment() {
    please.createComment({ post_id: post.post_id, user_id: userID, message: comment })
      .then((response) => {
        console.log(response);
        setComment('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLike() {
    console.log('liked')
  }
  // function handleLike() {
  //   console.log('DEBUG in handleLike postItem here is post: ', post)
  //   if (requestInFlight) {
  //     // console.log('DEBUG: request in flight');
  //     return;
  //   }
  //   requestInFlight = true;
  //   // console.log('these are likes: ', event)
  //   // console.log(`DEBUG: likes: ${this.state.likes}`);

  //   // console.log('DEBUG: event.postlikes', event.postlikes.filter(u => u.id === userID));
  //   if (meLikey) {
  //     // console.log('DEBUG: likes--');
  //     // user already liked, so remove the like
  //     please
  //       .deletePostLike(post.post_id, userID)
  //       .catch((err) => console.log('DEBUG:', err))
  //       .then(() => {
  //         // console.log('DEBUG: likes-- handled');
  //         setLikeCount(likeCount - 1);
  //         setMeLikey(false);
  //         requestInFlight = false;
  //       });
  //   } else {
  //     // console.log('DEBUG: likes++');
  //     please
  //       .createPostLike({
  //         post_id: post.post_id,
  //         user_id: userID,
  //       })
  //       .catch((err) => console.log('DEBUG:', err))
  //       .then(() => {
  //         // console.log('DEBUG: HERE');
  //         // console.log(`DEBUG: resp ${JSON.Stringify(resp)}`);
  //         // console.log("DEBUG: likes++ handled");
  //         setLikeCount(likeCount - 1);
  //         setMeLikey(false);
  //         requestInFlight = false;
  //       });
  //   }
  // }

  return (
    <Box
      boxShadow="md"
      rounded="lg"
      mb={4}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          {/* <Image
            borderRadius="full"
            boxSize="80px"
            src={post.picture}
            // alt={ event.eventName }
            p={1}
          /> */}
          <Box p={1} align="left">
            <Text fontSize="lg" fontWeight="bold">
              {`${post.firstname}:`}
            </Text>
            <Text>
              {post.content}
            </Text>

          </Box>
        </Flex>
          {/* (post.photo && <img></img>) */}
        <Stack shouldWrapChildren direction="row">
          <Text>
            {likeCount}
          </Text>
          <Icon as={BiHomeSmile} w={6} h={6} onClick={() => { handleLike(); }} />
          <Text>
            {post.comments.length}
          </Text>
          <Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} />
        </Stack>
      </HStack>
      <Box>
        <CommentList comments={post.comments} />
      </Box>
      <Textarea
        value={comment}
        onChange={(e) => { setComment(e.target.value); }}
        placeholder="...your comment here"
        size="sm"
      />
      <Button colorScheme="blue" onClick={() => { sendComment(); }}> Post </Button>
    </Box>
  );
}

export default PostItemOld;
