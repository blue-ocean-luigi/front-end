import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import GroupItem from './GroupItem';


function GroupList({ groups}) {
  return (
    <Box align="center" width='95%' overflow='scroll'  height='600px'>
      {groups.map((group) => <GroupItem key={group.id} group={group} />)}
    </Box>
  );
}

export default GroupList;
