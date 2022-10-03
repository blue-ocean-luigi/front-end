/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import GroupPage from './GroupPage';
import HomePage from './HomePage/HomePage.jsx';
import ProfilePage from "./ProfilePage/ProfilePage.jsx";

function PageControl({ userID }) {
  const [page, setPage] = useState('home');
  return (
    <div>
      <div>
        {(() => {
          switch (page) {
            case 'home':
              return <HomePage setPage={setPage} userID={userID} />;
            // case 'home':
            //   return <HomePage setPage={setPage} userID={userID} />;
            case 'group':
              return <GroupPage setPage={setPage} userID={userID} page={page} />; // set display for logout fx.
            // case 'profile':
            //   return <ProfilePage setPage={setPage} userID={userID} />;
            case 'profile':
              return <ProfilePage setPage={setPage} userID={userID} />
            default:
              // return <GroupPage setPage={setPage} userID={userID} />;
              return <HomePage setPage={setPage} userID={userID} />;
          }
        })()}
      </div>
    </div>
  );
}

export default PageControl;
