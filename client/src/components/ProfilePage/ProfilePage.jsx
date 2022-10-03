import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
// user will actually come from context hook

  return (
    <div>
      <div className="pp_banner_container">
        <img className="pp_profile_pic" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="profile icon" />
        <img className="pp_profile_banner" src="https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg" alt="profile banner" />
      </div>
      <div className="pp_bio_container"></div>
      <div className="pp_friend_group_container"></div>
    </div>
  );
}

export default ProfilePage;
