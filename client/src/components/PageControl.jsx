/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import GroupPage from './GroupPage';
import HomePage from './HomePage/HomePage.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';

function PageControl({ userID, page, setPage }) {
  return (
    <div>
      <div>
        {(() => {
          switch (page) {
            case 'home':
              return <HomePage setPage={setPage} userID={userID} />;
            case 'group':
              return <GroupPage setPage={setPage} userID={userID} page={page} />;
            case 'profile':
              return <ProfilePage setPage={setPage} userID={userID} />;
            default:
              return <HomePage setPage={setPage} userID={userID} />;
          }
        })()}
      </div>
    </div>
  );
}

export default PageControl;
