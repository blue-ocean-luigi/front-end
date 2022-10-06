import React, { useState, useEffect } from 'react';
import { Box, Image, Grid, Text, VStack } from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';

function SearchCard({id, name, picture}) {
  // console.log(id, name, picture)
  const { mainPage, setMainPage, setCurrentUserID } = UseContextAll();

  function handleSelect() {
    console.log('connect to friend profile or group page')
    // setCurrentUserID(friend.id);
    // setMainPage('profile');
  }
  return (

    <Box>
      <Grid
        sx={{
          gridTemplateColumns: '50px 1fr',
          gridColumnGap: '1rem',
          height: '70px',
          overflow: 'hidden'
        }}>
        <Box onClick={() => handleSelect()}>
          <Image
            src={picture}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'civer'
            }}/>
        </Box>
        <VStack>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default SearchCard;