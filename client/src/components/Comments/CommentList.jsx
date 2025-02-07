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

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments
    };
    this.requestInFlight = false;
  }


  // handleNewComment(newComment) {
  //   newCommentList = this.state.comments.push(newCommentList);
  //   this.setState(comments: newCommentList);
  // }

  render() {
    const { userID, comments } = this.props;
    // console.log('in event item and rendering: ', event);
    return (
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: '#f7d359', color: 'black' }}>
              <Box flex='1' textAlign='left'>
                { (comments.length > 0)
                  ? `Show Comments (${comments.length})`
                  : 'No comments yet, be the first!'
                }
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {comments.map((comment, index) =>
            <CommentItem
              userID = {userID}
              comment={comment}
              key={index}
            />)}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default CommentList;