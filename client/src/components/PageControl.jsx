/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line import/extensions
import HomePage from './HomePage.jsx';
import GroupPage from './GroupPage.jsx';

function PageControl({ userID }) {
  const [page, setPage] = useState('group');
  return (
    <div>
      <nav> Nave bar goes here </nav>
      <div>
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
              return <HomePage setPage={setPage} userID={userID} />;
          }
        })()}
      </div>
      <nav> Chat bar goes here </nav>
    </div>
  );
}

export default PageControl;
