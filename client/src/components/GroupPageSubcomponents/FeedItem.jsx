import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

function FeedItem({ event }) {
  return (
    <Box bg="lightgreen">
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
    </Box>
  );
}

export default FeedItem;
