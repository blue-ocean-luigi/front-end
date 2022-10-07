import React, { useState } from 'react';
import { BiHomeSmile, BiMessageAdd } from 'react-icons/bi';
import { FaRegEnvelopeOpen } from "react-icons/fa";
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
import { UseContextAll } from './ContextAll';
import { please } from '../request';

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.state = {
      comment: '',
      comments: props.event.comments,
      likes: props.event.postlikes.length,
      meLikey: props.event.postlikes.filter(u => u.id === props.userID).length > 0,
    };
    this.requestInFlight = false;
  }

  handleLike(event, userID) {
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
        .deletePostLike(event.post_id, userID)
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
          post_id: event.post_id,
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
    const { event, setEvents, userID, updateFeed, currentGroupID } = this.props;
    please.createComment({ post_id: event.post_id, user_id: userID, message: comment })
      .then((response) => {
        console.log(response);
        this.setState({
          comment: '',
        });
      })
      .then((res) => console.log('HAI just finished sending comment '))
      .then((res) => please.getGroupPosts(currentGroupID))
      .then((res) => {
        console.log('HAI this is res: ', res.data)
        const newComments = res.data.filter(i=> i.post_id===event.post_id)[0].comments;
        console.log('HAI newComments: ', newComments)
        this.setState({comments: newComments})

      })
      .catch((err) => console.log('HAI hit an error getting group posts: ', err))
      .then(() => console.log('HAI just finished updating feed'))

  }

  render() {
    const { event, userID, updateFeed, rsvps, setRsvps, going, setGoing } = this.props;
    const { comment, likes, comments } = this.state;
    console.log('HAI IN STATE HERE IS COMMENTS: ', comments)
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
            {/* <Text>{event.postlikes.length}</Text> */}
            <Text>{likes}</Text>
            <Tooltip label="likes">
              <span><Icon as={BiHomeSmile} w={6} h={6} onClick={() => this.handleLike(event, userID)} /></span>
            </Tooltip>
            <Text>{comments.length}</Text>
            <Tooltip label="comments">
              <span><Icon as={BiMessageAdd} w={6} h={6} onClick={() => { console.log('scroll to comment?'); }} /></span>
            </Tooltip>
            <Text> {rsvps.length} </Text>
            <Tooltip label="RSVPs">
              <span><Icon as={FaRegEnvelopeOpen} w={6} h={6} /></span>
            </Tooltip>
          </Stack>
        </HStack>
        <EventView eventInfo={event} handleLike={this.handleLike} sendComment={this.sendComment} rsvps={rsvps} setRsvps={setRsvps} />
        <Box>
          {/* <CommentList comments={event.comments} /> */}
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
          onClick={() => {
            console.log('HAI in button')
            this.sendComment(comment)
            // const newComments = comments.push(comment)
            // this.setState({comments: newComments})
          } }
        >
          Post
        </Button>
      </Box>
    );
  }
}

export default EventItem;
