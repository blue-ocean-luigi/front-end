import React from 'react';
import { Box } from '@chakra-ui/react';
import './HomeFeedPost.css';
import PostItem from '../../PostItem';
import EventItem from '../../EventItem';

function Post({post}) {
  return (
    <Box mr={4}>
      {
      post.isevent ? (
        <EventItem event={post} />
        // <>
        //   <img className="hp_post_image" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="poster" />
        //   <p className="hp_post_name">{post.userName}</p>
        //   <p className="hp_post_content">{post.content}</p>
        //   <span className="hp_post_date">date</span>
        // </>
      ) : (
        <PostItem post={post} />
        // <>
        //   <img className="hp_post_image" src="https://i.pinimg.com/originals/42/90/35/429035c30c3e0aa7169168a93fdbe551.jpg" alt="poster" />
        //   <p className="hp_post_name">{post.groupName}</p>
        //   <p className="hp_post_content">{post.description}</p>
        // </>
      )
      }
    </Box>
  );
}
export default Post;
