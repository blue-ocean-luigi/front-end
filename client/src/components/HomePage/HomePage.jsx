import React, { useState, useEffect } from 'react';
import GroupPage from '../GroupPage';
import FriendsList from '../FriendsListSubcomponents/FriendsList';
import HomeFeedPost from './post/HomeFeedPost';
import NewUserFeed from './NewUserFeed';
import ReturnUserFeed from './ReturnUserFeed';
import './HomePage.css';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';
//  props should be user info, if user is new
function HomePage() {
  const {
    userInfo,
    userGroups,
    userFriends,
    homePosts,
  } = UseContextAll();
  const [newUser, setNewUser] = useState(false);
  const [search, setSearch] = useState('');

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('searched for: ', search);
    setSearch('');
  }

  return (
    <div className="hp_home_feed_container">
      <div className="hp_search_bar_container">
        <form>
          <input type="text" placeholder="Search" className="hp_search_bar" onChange={(e) => handleChange(e)} value={search} />
          <button type="submit" className="hp_search_btn" onClick={(e) => handleSubmit(e)}>Search!</button>
        </form>
      </div>
      <div className="hp_body_container">
        <div className="hp_sidebar">
          <div className="hp_profile_img_container">
            <img src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="alt" className="hp_profile_img"
            onClick={()=>console.log('clicked profile image')} />
          </div>
          <div className="hp_group_list_container">
            {userGroups.map((group, i) => (
              <span key= {i} className="hp_group_name"
              onClick={()=>console.log('clicked', group.name)}>{group.name}</span>
            )) }
          </div>
          {/* <div className="hp_friends_list_container">
              {testfriendlist.map((friend, i) => (<span key={i}className="hp_friend_name" onClick={()=>console.log('clicked: ', friend)}>{friend}</span>))}
          </div> */}
          <FriendsList friends={userFriends.friendlist} />
        </div>
        {newUser ? <NewUserFeed /> : <ReturnUserFeed homePosts={homePosts} />}
      </div>
    </div>
  );
}

export default HomePage;

// should list
// search, event feed, groups list & friends list,

// need to set up so that i render a list of fiends and a list of groups in the left column, and on click those utilize the context to re render the page based on
