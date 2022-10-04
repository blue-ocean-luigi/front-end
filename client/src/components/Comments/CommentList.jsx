import React, { useState } from 'react';
import {
  Box,
  Text,
  HStack,
  Flex,
  Button,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function CommentList({ comments }) {
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
            <Box
            key={index}
            boxShadow="md"
            rounded="lg"
            mb={4}
            borderWidth="1px">
              <Text>{comment.username}: {comment.comment}</Text>
            </Box>)}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default CommentList;
