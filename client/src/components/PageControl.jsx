/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
} from '@chakra-ui/react';
import GroupPage from './GroupPage';
import HomePage from './HomePage/HomePage.jsx';

function PageControl({ userID }) {
  const [page, setPage] = useState('group');
  return (
    <div>
      <nav> Nave bar goes here </nav>
      <Box>
        {(() => {
          switch (page) {
            case 'home':
              return <HomePage setPage={setPage} userID={userID} />;
            // case 'home':
            //   return <HomePage setPage={setPage} userID={userID} />;
            case 'group':
              return <GroupPage setPage={setPage} userID={userID} />; // set display for logout fx.
            // case 'profile':
            //   return <ProfilePage setPage={setPage} userID={userID} />;
            default:
              // return <GroupPage setPage={setPage} userID={userID} />;
              return <HomePage setPage={setPage} userID={userID} />;
          }
        })()}
      </Box>
      <nav> Chat bar goes here </nav>
    </div>
  );
}

export default PageControl;
