import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
// user will actually come from context hook

let backgroundImage = "https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg";

let userbio = "This is an example bio that i am using just to fill space, i could use a lorem ipsum but if i did i wouldnt be able to talk about guiena pigs would i?"

  return (
    <div className="profile_page_container">
      <div
        className="pp_banner_container"
        style={{ backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        alt="profile banner"
      >
        <img className="pp_profile_pic" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="profile icon" />
        {/* <img className="pp_profile_banner" src="https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg" alt="profile banner" /> */}
      </div>
      <div className="pp_bio_container">
        <h3 className="pp_bio_title">bio: </h3>
        <p className="pp_bio_text">{`${userbio}`}</p>
      </div>
      <div className="pp_friend_group_container"></div>
    </div>
  );
}

export default ProfilePage;
