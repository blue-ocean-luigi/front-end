import React, { useState, useEffect } from 'react';
// import GroupPage from "./GroupPage";
// import FriendsList from "./FriendsList";
import '../../dist/HomePage.css';

//  props should be user info, if user is new
function HomePage() {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="hp_home_feed_container">
      <div className="hp_search_bar">
        <h2>search bar</h2>
      </div>
      <div className="hp_sidebar">
        <h2>image here</h2>
        {/* <img alt="alt"></img> */}
        {/* <GroupPage />
        <FriendsList /> */}
      </div>
      {newUser ? (
        <div className="hp_home_feed">
          <h1>NEW USER</h1>
        </div>
      ) : (
        <div className="hp_home_feed">
          {/* <Post /> */}
          <h1>EXISTING USER</h1>
        </div>
      )}
    </div>
  );
}

export default HomePage;

// should list
// search, event feed, groups list & friends list,
