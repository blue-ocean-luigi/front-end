import React, { useState, useRef } from 'react';
import {
  Input,
  Box,
} from '@chakra-ui/react';
import SearchCard from '../HomePage/SearchCard';

function SearchGroup({members, events}) {
  const [ searchArray, setSearchArray ] = useState([]);
  const [emptyResults, setEmptyResults] = useState(false);

  const debounce = (func, timeout = 500)  => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {func.apply(this, args); }, timeout)
    }
  }

  const search = debounce((e) => {
    const term = e.target.value.toLowerCase();
    setEmptyResults(searchArray.length === 0 && term !== '');
    const curSearchArray = [];

    if(term !== '') {
      members.forEach(member => {
        let userName = `${member.firstName} ${member.lastName}`;

        if(userName.toLowerCase().includes(term)) {
          let memberObj = {
            id: member.id,
            name: userName,
            picture: member.picture,
          };

          curSearchArray.push(memberObj);
        };
      });
      events.forEach(event => {
        let eventName = event.eventname;

        if(eventName.toLowerCase().includes(term)) {

          let eventObj = {
            id: event.post_id,
            name: eventName,
            picture: event.photos[0] || 'https://cdn.vox-cdn.com/thumbor/-naXoT1PTZa-nEbqdI5hsbHsIjo=/0x0:1215x717/1520x1013/filters:focal(662x145:856x339):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/52782137/Ahri_Splash_4.0.jpg'
          };

          curSearchArray.push(eventObj);
        };
      });
    }
    setSearchArray(curSearchArray);
  })


  return (
    <>
      <Input variant="filled" placeholder="Search for group members, events, posts..." onChange={search} />
      { searchArray[0] &&
        <Box style={{position: "absolute", width:"100%", zIndex:1, backgroundColor: 'var(--chakra-colors-chakra-body-bg'}}>
          {searchArray.map((obj, index) =>
            <SearchCard key={index} id={obj.id} name={obj.name} picture={obj.picture}/>
          )}
        </Box>
      }
      { emptyResults &&
        <Box style={{position: 'absolute', width:'100%', zIndex:1, backgroundColor: 'var(--chakra-colors-chakra-body-bg', display:'flex', justifyContent: 'center', fontSize: '50px'}}>
          NOTHING FOUND, TRY AGAIN SUCKA
        </Box>
      }
    </>
  );
}

export default SearchGroup;
