import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
// user will actually come from context hook
  let [currUser, setCurrUser] = useSate["user"]

  return (
    <div>
      <h1>profile page</h1>
    </div>
  );
}

export default ProfilePage;
