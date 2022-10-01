/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function PageControl({ userID }) {
  const [page, setPage] = useState('home');
  return (
    <div>
      <nav> Nave bar goes here </nav>
      <div>
        {(() => {
          switch (page) {
            case 'home':
              return <HomePage setPage={setPage} userID={userID} />; // James
            case 'group':
              return <GroupPage setPage={setPage} userID={userID} />; // set display for logout fx.
            case 'profile':
              return <ProfilePage setPage={setPage} userID={userID} />; // James
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
