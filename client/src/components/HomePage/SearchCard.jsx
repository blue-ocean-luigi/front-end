import React, { useState, useEffect } from 'react';
import { Box, Image, Grid, Text, VStack } from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';

function SearchCard({id, name, picture, type}) {
  // console.log(id, name, picture)
  const { mainPage, setMainPage, setCurrentUserID, setCurrentGroupID } = UseContextAll();

  function handleSelect() {
    if (type === 'users') {
      setCurrentUserID(id);
      setMainPage('profile');
    } else if ( type === 'groups' ) {
      setCurrentGroupID(id);
      setMainPage('group');
    }
  }
  return (

    <Box onClick={() => handleSelect()}>
      <Grid
        sx={{
          gridTemplateColumns: '50px 1fr',
          gridColumnGap: '1rem',
          height: '40px',
          overflow: 'hidden'
        }}>
        <Box>
          <Image
            borderRadius="full"
            boxSize="40px"
            src={picture ? picture : 'https://picsum.photos/seed/picsum/200/300'}
            p={1}
          />
        </Box>
        <VStack>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default SearchCard;