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

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.state = {
      comment: '',
      likeCount: 0,
    };
  }

  handleLike() {
    const { likeCount } = this.state;
    if (likeCount < 1) {
      console.log('send a like, then increase likeCOunt');
      this.setState({
        likeCount: 1,
      });
    }
  }

  sendComment(comment) {
    console.log('send comment: ', comment);
    this.setState({
      comment: '',
    });
  }

  render() {
    const { event } = this.props;
    const { comment } = this.state;
    console.log(event);
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
              src={event.picture}
              alt={event.eventname}
              p={1}
            />
            <Box p={1} align="left">
              <Text fontSize="2xl">
                {event.eventname}
              </Text>
              <Text>
                {event.starttime}
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
            <Text>{event.postlikes.length}</Text>
            <Icon as={BiHomeSmile} w={6} h={6} onClick={() => { this.handleLike(); }} />
            <Text>{event.comments.length}</Text>
            <Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} />
          </Stack>
        </HStack>
        <EventView eventInfo={event} handleLike={this.handleLike} sendComment={this.sendComment} />
        <Box>
          <CommentList comments={event.comments} />
        </Box>
        <Textarea
          value={comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
          placeholder="...your comment here"
          size="sm"
        />
        <Button colorScheme="blue" onClick={() => this.sendComment(comment)}> Post </Button>
      </Box>
    );
  }
}

export default EventItem;
