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
} from '@chakra-ui/react';

function PostItem({ post, postView, setPostView }) {
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);

  function sendComment() {
    console.log('handle comment');
    setComment('');
  }

  function handleLike() {
    if (likeCount < 1) {
      console.log('send a like, then increase likeCOunt');
    }
  }

  return (
    <Box
      boxShadow="md"
      rounded="lg"
      mb={4}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <div>
          {/* <img src={post.profilepic}/> */}
          <span>*post.username* : *post.content*</span>
          {/* (post.photo && <img></img>) */}
        </div>
        <Stack shouldWrapChildren direction="row">
          <Text> *no.Likes* </Text>
          <Icon as={BiHomeSmile} w={6} h={6} onClick={() => { handleLike(); }} />
          <Text> *no.comments</Text>
          <Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} />
        </Stack>
        <Box>
        {/* {post.comments.map((comment, index) => <CommentItem comment={comment} key={index} />)} */}
          this is where comments will go.
        </Box>
        <Text mb="8px">Leave a comment</Text>
        <Textarea
          value={comment}
          onChange={(e) => { setComment(e.target.value); }}
          placeholder="...your comment here"
          size="sm"
        />
        <Button colorScheme="blue" onClick={() => { sendComment(); }}> Post </Button>
      </HStack>
    </Box>
  );
}

export default PostItem;
