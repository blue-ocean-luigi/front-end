import React from 'react';
import './HomeFeedPost.css';

function Post({type, post}) {
  return (
    <div className="hp_post">
      {
      type === 'post' ? (
        <>
          <img className="hp_post_image" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="poster" />
          <p className="hp_post_name">{post.userName}</p>
          <p className="hp_post_content">{post.content}</p>
          <span className="hp_post_date">date</span>
        </>
      ) : (
        <>
          <img className="hp_post_image" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="poster" />
          <p className="hp_post_name">{post.groupName}</p>
          <p className="hp_post_content">{post.description}</p>
        </>
      )
      }
    </div>
  );
}
export default Post;
