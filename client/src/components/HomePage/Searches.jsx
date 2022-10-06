import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import { Box, Image, Grid, Text, VStack } from '@chakra-ui/react';

function Searches(props) {

  let map = props.data.map((search, index) => {
    let name, id
    let picture = search.picture
    if (search.user_id) {
      name = search.firstName + '' + search.lastName
      id = search.user_id
    }
    if (search.group_id) {
      name = search.name
      id = search.group_id
    }
    return (
      <div>
        <SearchCard/>
      </div>

    )
  })

  return (
    <div>
      {map}
    </div>
  );
}

export default Searches;