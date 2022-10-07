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

    <Box onClick={() => handleSelect()} borderBottom="1px solid black">
      <Grid
        sx={{
          gridTemplateColumns: '70px 1fr',
          gridColumnGap: '5rem',
          height: '70px',
          overflow: 'hidden',
        }}>
        <Box display="flex" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="70px"
            src={picture ? picture : 'https://picsum.photos/seed/picsum/200/300'}
            p={1}
          />
        </Box>
        <VStack height="100%">
          <Text noOfLines={1} fontSize="30px" paddingTop="15px">{name}</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default SearchCard;