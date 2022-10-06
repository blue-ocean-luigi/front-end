import React, { useState } from 'react';
import { BiHomeSmile, BiMessageAdd } from 'react-icons/bi';
import {
  Box,
  Text,
  HStack,
  Flex,
  Image,
  Button,
  Stack,
  Icon,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import EventView from '../Modals/EventView';
import CommentList from './CommentList';
import { please } from '../../request';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      message: props.comment.message,
      likes: props.comment.likes.length,
      meLikey: props.comment.likes.filter(u => u.id === props.userID).length > 0,
    };
    this.requestInFlight = false;
  }

  handleLike(comment, userID) {
    if (this.requestInFlight) {
      // console.log('DEBUG: request in flight');
      return;
    }
    this.requestInFlight = true;
    if (this.state.meLikey) {
      // console.log('DEBUG: likes--');
      // user already liked, so remove the like
      please
        .deleteCommentLike(comment.comment_id, userID)
        .catch((err) => console.log('DEBUG:', err))
        .then(() => {
          // console.log('DEBUG: likes-- handled');
          this.setState({
            likes: this.state.likes - 1,
            meLikey: false,
          });
          this.requestInFlight = false;
        })
    } else {
      // console.log('DEBUG: likes++');
      please
        .createCommentLike({
          comment_id: comment.comment_id,
          user_id: userID,
        })
        .catch((err) => console.log('DEBUG:', err))
        .then(() => {
          // console.log('DEBUG: HERE');
          // console.log(`DEBUG: resp ${JSON.Stringify(resp)}`);
          // console.log("DEBUG: likes++ handled");
          this.setState({
            likes: this.state.likes + 1,
            meLikey: true,
          });
          this.requestInFlight = false;
        });
    }
  }



  render() {
    const { comment, userID } = this.props;
    const { message, likes } = this.state;
    // console.log('in event item and rendering: ', event);

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
                {message}
              </Text>

            </Box>
          </Flex>
            {/* (post.photo && <img></img>) */}
          <Stack shouldWrapChildren direction="row">
            <Text>
              {likes}
            </Text>
            <Tooltip label="likes">
              <span><Icon as={BiHomeSmile} w={6} h={6} onClick={() => this.handleLike(comment, userID)} /></span>
            </Tooltip>
          </Stack>
        </HStack>
      </Box>
    );
  }
}

export default CommentItem;
