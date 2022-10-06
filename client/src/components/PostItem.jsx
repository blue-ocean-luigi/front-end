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
} from '@chakra-ui/react';
import EventView from './Modals/EventView';
import CommentList from './Comments/CommentList';
import { please } from '../request';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.state = {
      comment: '',
      comments: props.post.comments,
      likes: props.post.postlikes.length,
      meLikey: props.post.postlikes.filter(u => u.id === props.userID).length > 0,
    };
    this.requestInFlight = false;
  }

  handleLike(post, userID) {
    if (this.requestInFlight) {
      // console.log('DEBUG: request in flight');
      return;
    }
    this.requestInFlight = true;
    // console.log('these are likes: ', event)
    // console.log(`DEBUG: likes: ${this.state.likes}`);

    // console.log('DEBUG: event.postlikes', event.postlikes.filter(u => u.id === userID));
    // console.log('in handle like here is event: ', event)
    // console.log('here is userID in handleLike: ', userID)
    // check if the user has already liked the posts
    if (this.state.meLikey) {
      // console.log('DEBUG: likes--');
      // user already liked, so remove the like
      please
        .deletePostLike(post.post_id, userID)
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
        .createPostLike({
          post_id: post.post_id,
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

  sendComment(comment) {
    const { post, userID } = this.props;

    please.createComment({ post_id: post.post_id, user_id: userID, message: comment })
      .then((response) => {
        console.log(response);
        this.setState({
          comment: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { post, userID } = this.props;
    const { comment, likes, comments } = this.state;
    // console.log('in event item and rendering: ', event);

    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
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
              src={post.picture}
              alt={post.firstname}
              p={1}
            />
            <Box p={1} align="left">
              <Text fontSize="2xl">
                {post.firstname}
              </Text>
              <Text>
                {post.content}
              </Text>
            </Box>
          </Flex>
          {/* { page === 'group'
            && (
            <Flex p={1}>
              <Button size="xs" onClick={() => onInvite(event)}> Invite </Button>
            </Flex>
            ) } */}

          <Stack shouldWrapChildren direction="row">
            <Text>{likes}</Text>
            <Icon as={BiHomeSmile} w={6} h={6} onClick={() => this.handleLike(post, userID)} />
            {/* <Text>{event.comments.length}</Text> */}
            <Text>{comments.length}</Text>
            <Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} />
          </Stack>
        </HStack>
        <Box>
          <CommentList comments={comments} />
        </Box>
        <Textarea
          value={comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
          placeholder="...your comment here"
          size="sm"
        />
        <Button
          colorScheme="blue"
          onClick={() => this.sendComment(comment)}
        >
          Post
        </Button>
      </Box>
    );
  }
}

export default PostItem;
