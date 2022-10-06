import React, { useState } from 'react';
import {
  Box,
  Text,
  HStack,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import CommentItem from './CommentItem';
import { UseContextAll } from '../ContextAll';

function CommentList({ comments }) {
  const [commentLike, setCommentLike] = useState(0);
  const { userID } = UseContextAll();

  function sendCommentLike() {
    if (commentLike < 1) {
      console.log('send comment');
      setCommentLike(1);
    }
  }
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Show Comments
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {comments.map((comment, index) =>
          <CommentItem
            userID = {userID}
            comment={comment}
            sendCommentLike={sendCommentLike}
            key={index}
          />)}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default CommentList;
