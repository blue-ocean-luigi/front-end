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
      return;
    }
    this.requestInFlight = true;
    if (this.state.meLikey) {
      please
        .deletePostLike(post.post_id, userID)
        .catch((err) => console.log('DEBUG:', err))
        .then(() => {
          this.setState({
            likes: this.state.likes - 1,
            meLikey: false,
          });
          this.requestInFlight = false;
        })
    } else {
      please
        .createPostLike({
          post_id: post.post_id,
          user_id: userID,
        })
        .catch((err) => console.log('DEBUG:', err))
        .then(() => {
          this.setState({
            likes: this.state.likes + 1,
            meLikey: true,
          });
          this.requestInFlight = false;
        });
    }
  }

  sendComment(comment) {
    const { post, userID, currentGroupID } = this.props;
    please.createComment({ post_id: post.post_id, user_id: userID, message: comment })
      .then((response) => {
        console.log(response);
        this.setState({
          comment: '',
        });
      })
      .then((res) => please.getGroupPosts(post.group_id))
      .then((res) => {
        const newComments = res.data.filter(i=> i.post_id===post.post_id)[0].comments;
        this.setState({comments: newComments})
      })
      .catch((err) => console.log('HAI hit an error getting group posts: ', post))

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
          <Stack shouldWrapChildren direction="row">
            <Text>{likes}</Text>
            <Tooltip label="likes">
              <span><Icon as={BiHomeSmile} w={6} h={6} onClick={() => this.handleLike(post, userID)} /></span>
            </Tooltip>
            <Text>{comments.length}</Text>
            <Tooltip label="comments">
              <span><Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} /></span>
            </Tooltip>

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
        <Box align="right">
          <Button
            mt={2}
            mb={2}
            backgroundColor="#f7d359"
            variant="ghost"
            onClick={() => this.sendComment(comment)}
          >
            Post Comment
          </Button>
        </Box>
      </Box>
    );
  }
}

export default PostItem;
