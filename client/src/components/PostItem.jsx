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

function PostItem({ post }) {
  console.log('this is post: ', post)
  const { userID } = UseContextAll();
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(post.postlikes.length);

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
    console.log('liking ')
    // // console.log('in handle like here is event: ', event)
    // // console.log('here is userID in handleLike: ', userID)
    // // check if the user has already liked the posts
    // if (post.postlikes.filter(u => u.id === userID).length > 0
    // || this.state.justLiked) {
    //   // user already liked, so remove the like
    //   please.deletePostLike(event.post_id, userID)
    //     .then(() => this.setState(
    //       {
    //         likes: this.state.likes - 1,
    //         justLiked: false,
    //       }))
    //     .catch((err) => console.log(err))
    // } else {
    //   please.createPostLike(
    //     {
    //       post_id: event.post_id,
    //       user_id: userID,
    //     },
    //   )
    //     .then(() => this.setState(
    //       {
    //         likes: this.state.likes + 1,
    //         justLiked: true,
    //       }))
    //     .catch((err) => console.log(err));
    // }
  }

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

export default PostItem;
