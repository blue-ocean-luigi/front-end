import React from 'react';
import HomeFeedPost from './post/HomeFeedPost';

function ReturnUserFeed({ homePosts }) {
  return (
    <div>
      <div className="hp_home_feed">
        <h1>EXISTING USER</h1>
        {homePosts.map((post, i) => <HomeFeedPost key={i} post={post} />)}
      </div>
    </div>
  );
}

export default ReturnUserFeed;
