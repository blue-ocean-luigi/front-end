import React from 'react';
import { BiHomeSmile } from 'react-icons/bi';
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

function CommentItem({ comment, sendCommentLike }) {
  return (
    <Box
      boxShadow="md"
      rounded="lg"
      mb={4}
      borderWidth="1px"
    >
      <HStack justifyContent="space-between" p={1}>
        <Flex justifyContent="left">
          <Image
            borderRadius="full"
            boxSize="80px"
            src={comment.picture}
            // alt={ event.eventName }
            p={1}
          />
          <Box p={1} align="left">
            <Text fontSize="lg" fontWeight="bold">
              {`${comment.firstName}:`}
            </Text>
            <Text>
              {comment.message}
            </Text>

          </Box>
        </Flex>
          {/* (post.photo && <img></img>) */}
        <Stack shouldWrapChildren direction="row">
          <Text>
            {comment.likes.length}
          </Text>
          <Icon as={BiHomeSmile} w={6} h={6} onClick={() => sendCommentLike()} />
        </Stack>
      </HStack>
    </Box>
  );
}

export default CommentItem;
