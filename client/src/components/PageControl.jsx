/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import GroupPage from './GroupPage';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import HomePage from './HomePage/HomePage.jsx';

function PageControl({ setMainDisplay, userID }) {
  const [page, setPage] = useState('home');
  return (
    <div>
      <NavBar setMainDisplay={setMainDisplay}/>
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
              // return <GroupPage setPage={setPage} userID={userID} />;
              return <HomePage setPage={setPage} userID={userID} />;
          }
        })()}
      </div>
      <ChatBar />
    </div>
  );
}

export default PageControl;
