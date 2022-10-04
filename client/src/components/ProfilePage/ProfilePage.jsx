import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import FriendsList from "../FriendsListSubcomponents/FriendsList.jsx"
import { please } from "../../request.jsx"

function ProfilePage() {
// user will actually come from context hook

// let backgroundImage = 'https://news.clas.ufl.edu/wp-content/uploads/sites/4/2020/06/AdobeStock_345118478-copy-1440x961-1-e1613512040649.jpg';

// let userbio = 'This is an example bio that i am using just to fill space, i could use a lorem ipsum but if i did i wouldnt be able to talk about guiena pigs would i?';

// let friends = [
//   { name: 'bell pepper', profilePicture: 'https://homefrontfarmers.com/wp-content/uploads/bb-plugin/cache/hff-changing-peppers-sm-1500x1001-panorama.jpg' },
//   { name: 'cucumber', profilePicture: 'https://www.plantgrower.org/uploads/6/5/5/4/65545169/published/cucumber-slices.jpg?1516496438'},
//   { name: 'carrot', profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtYa4VW-7zI-UL564n3GZub9m6mK1L6aibg&usqp=CAU' },
//   { name: 'romaine', profilePicture: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/319725_1100-800x825.jpg' },
//   { name: 'tomato', profilePicture: 'https://www.willhiteseed.com/assets/images/products/0315-large.jpg' }];

//   const testobjgroup = [
//     { groupName: 'no girls allowed', description: 'a super cool super special group with none of those icky girls' },
//     { groupName: 'cat owners', description: 'we are a group of people who own cats, not just cat, but cats... lots of cats. its not an addiction, its not a problem, its okay this is fine.' },
//   ];


//goin to need user info (pic, banner pic, bio) as well as group list and friend list

const [bio, setBio] = useState('');
const [friends, setFriends] = useState([]);
const [groups, setGroups] = useState([]);
const [pic, setPic] = useState('');
const [banner, setBanner] = useState('');


let user = 5;

useEffect(() => {
  // please.getUserByID(user).then((data) => {
  //   setBio()
  //   console.log(data)})
  //   .catch((err)=>console.log(err))

}, [])

  return (
    <div className="profile_page_container">
      {/* <div
        className="pp_banner_container"
        style={{ backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        alt="profile banner"
      >
        <img className="pp_profile_pic" src="https://i.pinimg.com/736x/50/d8/03/50d803bda6ba43aaa776d0e243f03e7b.jpg" alt="profile icon" />
      </div> */}
      <div className="pp_bio_container">
        <h3 className="pp_bio_title">bio: </h3>
        <p className="pp_bio_text">INSERT USER BIO</p>
      </div>
      <div className="pp_friend_group_container">
        <div className="pp_friends_container">
          {/* <FriendsList friends={friends} /> */}
        </div>
        <div className="pp_groups_container">
          {/* {testobjgroup.map((group, i) => (
            <span
              key={i}
              className="pp_group_name"
              onClick={()=>console.log('clicked', group.groupName)}>
              {group.groupName}
            </span>
            )) } */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
