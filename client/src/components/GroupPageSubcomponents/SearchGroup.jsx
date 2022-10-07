import React, { useState, useRef } from 'react';
import {
  Input,
  Box,
} from '@chakra-ui/react';
import SearchCard from '../HomePage/SearchCard';

function SearchGroup({ members, events }) {
  const [searchArray, setSearchArray] = useState([]);

  const search = (e) => {
    const term = e.target.value.toLowerCase();
    const curSearchArray = [];

    if (term !== '') {
      members.forEach((member) => {
        const userName = `${member.firstName} ${member.lastName}`;

        if (userName.toLowerCase().includes(term)) {
          const memberObj = {
            id: member.id,
            name: userName,
            picture: member.picture,
            type: 'users',
          };

          curSearchArray.push(memberObj);
        }
      });
      events.forEach((event) => {
        if (event.isevent) {
          const eventName = event.eventname;
          if (eventName.toLowerCase().includes(term)) {
            const eventObj = {
              id: event.post_id,
              name: eventName,
              picture: event.picture || 'https://cdn.vox-cdn.com/thumbor/-naXoT1PTZa-nEbqdI5hsbHsIjo=/0x0:1215x717/1520x1013/filters:focal(662x145:856x339):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/52782137/Ahri_Splash_4.0.jpg',
              type: 'event',

            };
            curSearchArray.push(eventObj);
          }
        }
      });
    }
    setSearchArray(curSearchArray);
  };

  return (
    <>
      <Input variant="filled" placeholder="Search for group members, events, posts..." onChange={search} width="99%" />
      { searchArray[0]
        && (
        <Box style={{
          position: 'absolute', width: '100%', zIndex: 1, backgroundColor: 'var(--chakra-colors-chakra-body-bg',
        }}
        >
          {searchArray.map((obj, index) => (
            <SearchCard
              key={index}
              id={obj.id}
              name={obj.name}
              picture={obj.picture}
              type={obj.type}
            />
          ))}
        </Box>
        )}
    </>
  );
}

export default SearchGroup;
