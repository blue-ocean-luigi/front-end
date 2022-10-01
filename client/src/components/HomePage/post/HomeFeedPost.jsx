import React from 'react';
import './HomeFeedPost.css';

function Post({type, post}) {
  console.log(type)
  return (
    <div className="hp_post">
      {
      type === 'post' ? (
        <>
          <p className="hp_post_name">{post.userName}</p>
          <p className="hp_post_content">{post.content}</p>
        </>
      ) : (
        <>
          <p className="hp_post_name">{post.groupName}</p>
          <p className="hp_post_content">{post.description}</p>
        </>
      )
      }
    </div>
  );
}
export default Post;

// <p className="hp_post_name">{type === 'post' ? post.userName : post.groupName}</p>
// <p className="hp_post_content">{type === 'post' ? post.content : post.description}</p>