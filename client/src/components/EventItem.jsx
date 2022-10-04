import React, { useState } from 'react';
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import EventView from './Modals/EventView';

function EventItem({event}) {
  const [eventView, setEventView] = useState(false);
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div onClick={() => setEventView(true)}>
      {/* <img> Event image, if any go here</img> */}
      <Text fontSize="3xl">Event Title Here</Text>
      <Text fontSize="xl"> Date and Time go here</Text>
      <Text fontSize="2xl"> Group Name will go here</Text>
      <Text fontSize="lg"> Event description will go here as you can see :P </Text>
      {eventView && <EventView setEventView={setEventView} eventView={eventView} />}
    </div>
  );
}

export default EventItem;
