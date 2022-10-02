import React, { useState, useEffect } from 'react';
import GroupPage from "../GroupPage.jsx";
import FriendsList from "../FriendsList.jsx";
import HomeFeedPost from "./post/HomeFeedPost.jsx";
import './HomePage.css';

//  props should be user info, if user is new
function HomePage() {
  const testobjpost = [
    { userName: 'BIG RICK', content: 'big rick champion of neighborhood watch, protector of property values, hero of the homeowners association, was here!' },
    { userName: 'small rick', content: 'a much smaller, less impressive rick, was here...' },
  ];

  const testobjgroup = [
    { groupName: 'no girls allowed', description: 'a super cool super special group with none of those icky girls' },
    { groupName: 'cat owners', description: 'we are a group of people who own cats, not just cat, but cats... lots of cats. its not an addiction, its not a problem, its okay this is fine.' },
  ];

  const testfriendlist = ['apple', 'orange', 'banana', 'space shuttle'];

  const [newUser, setNewUser] = useState(false);
  const [posts, setPosts] = useState(testobjpost);
  const [groups, setGroups] = useState(testobjgroup);
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
            <img src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="alt" className="hp_profile_img" />
          </div>
          <div className="hp_group_list_container">
            {testobjgroup.map((group, i) => (
              <span key= {i} className="hp_group_name"
              onClick={()=>console.log('clicked', group.groupName)}>{group.groupName}</span>
            )) }
          </div>
          <div className="hp_friends_list_container">
              {testfriendlist.map((friend, i) => (<span key={i}className="hp_friend_name" onClick={()=>console.log('clicked: ', friend)}>{friend}</span>))}
          </div>
        </div>
        {newUser ? (
          <div className="hp_home_feed">
            <h1>NEW USER</h1>
            {groups.map((post, i) => (
              <HomeFeedPost key={i} type="group" post={post} />
            ))}
          </div>
        ) : (
          <div className="hp_home_feed">
            <h1>EXISTING USER</h1>
            {posts.map((post, i) => (
              <HomeFeedPost key={i} type="post" post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

// should list
// search, event feed, groups list & friends list,

// need to set up so that i render a list of fiends and a list of groups in the left column, and on click those utilize the context to re render the page based on
