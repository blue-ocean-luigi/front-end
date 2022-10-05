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

function PostItem({ post }) {
  console.log('this is post: ', post)
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
            {post.postlikes.length}
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
