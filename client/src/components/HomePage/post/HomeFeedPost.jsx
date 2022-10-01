import React from 'react';
import './HomeFeedPost.css';

function Post({post}) {
  return (
    <div className="hp_post">
      <p className="hp_post_name">{post.userName}</p>
      <p className="hp_post_content">{post.content}</p>
    </div>
  );
}
export default Post;
