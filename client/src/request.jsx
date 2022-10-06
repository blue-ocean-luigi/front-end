/* eslint-disable quotes */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

const basePath = 'http://localhost:3001/crossing';

export const please = {
  // get user info/friends/groups by email after authorization
  getUserByEmail: async (email) =>
    axios({
      url: "/user/info/email",
      method: "get",
      baseURL: basePath,
      params: { email },
    }),

  // get user info/friends/groups by id
  getUserByID: (user_id) =>
    axios({
      url: "/user/info/id",
      method: "get",
      baseURL: basePath,
      params: { user_id },
    }),

  // post new user to db
  addUser: (firstname, lastname, email, aboutme, picture) =>
    axios({
      url: "/user/add",
      method: "post",
      baseURL: basePath,
      data: {
        firstname,
        lastname,
        email,
        aboutme,
        picture,
      },
    }),

  // update user info (need all arguments)
  updateUser: (firstname, lastname, email, aboutme, picture, user_id) =>
    axios({
      url: "/user/update",
      method: "put",
      baseURL: basePath,
      data: {
        firstname,
        lastname,
        email,
        aboutme,
        picture,
        user_id,
      },
    }),

  // get user friends
  getFriendsOfUser: (user_id) =>
    axios({
      url: "/user/friends",
      method: "get",
      baseURL: basePath,
      params: { user_id },
    }),

  // get user groups
  getGroupsOfUser: (user_id) =>
    axios({
      url: "/user/groups",
      method: "get",
      baseURL: basePath,
      params: { user_id },
    }),

  // remove from friends list
  removeFriend: (user_id, friend_id) =>
    axios({
      url: `/user/friends/${user_id}&${friend_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // request to be friends
  requestFriend: (requester_id, requestee_id) =>
    axios({
      url: "/friends/request",
      method: "post",
      baseURL: basePath,
      data: { requester_id, requestee_id },
    }),

  // accept friend request
  acceptFriend: (requester_id, requestee_id) =>
    axios({
      url: "/friends/accept",
      method: "put",
      baseURL: basePath,
      data: { requester_id, requestee_id },
    }),

  // request to join group
  requestToJoinGroup: (group_id, user_id, message) =>
    axios({
      url: "/groups/joinrequest",
      method: "post",
      baseURL: basePath,
      data: { group_id, user_id, message },
    }),

  // get group info/members
  getGroupInfo: (group_id) =>
    axios({
      url: "/groups/info",
      method: "get",
      baseURL: basePath,
      params: { group_id },
    }),

  // get all open request for a group
  getOpenGroupRequest: (group_id) =>
    axios({
      url: "/groups/request",
      method: "get",
      baseURL: basePath,
      params: { group_id },
    }),

  // create a new group
  createNewGroup: (user_id, name, about, state, city, zip, picture) =>
    axios({
      url: "/groups/create",
      method: "post",
      baseURL: basePath,
      data: {
        name,
        about,
        state,
        city,
        zip,
        user_id,
        picture
      },
    }),

  // accept new member group request
  acceptGroupRequest: (group_id, user_id) =>
    axios({
      url: "/groups/accept",
      method: "post",
      baseURL: basePath,
      data: { group_id, user_id },
    }),

  // make group member and admin
  giveMemberAdminStatus: (group_id, user_id) =>
    axios({
      url: "/groups/admin",
      method: "put",
      baseURL: basePath,
      data: { group_id, user_id },
    }),

  // kick member out of group
  removeGroupMember: (group_id, user_id) =>
    axios({
      url: `/groups/member/${group_id}&${user_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // delete group
  deleteGroup: (group_id) =>
    axios({
      url: `/groups/${group_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // get all messages between user and friend
  getMessages: (user_id, friend_id) =>
    axios({
      url: "/messages/user",
      method: "get",
      baseURL: basePath,
      params: { user_id, friend_id },
    }),

  // post message
  postMessage: (sender_id, receiver_id, message) =>
    axios({
      url: "/messages/all",
      method: "post",
      baseURL: basePath,
      data: { sender_id, receiver_id, message },
    }),

  // get posts for user/group feed
  getUserPosts: (user_id) =>
    axios({
      url: `/userposts/${user_id}`,
      method: "get",
      baseURL: basePath,
    }),

  getGroupPosts: (group_id) =>
    axios({
      url: `/groupposts/${group_id}`,
      method: "get",
      baseURL: basePath,
    }),

  // creating a post
  createPost: (info) =>
    axios({
      url: `/posts`,
      method: "post",
      baseURL: basePath,
      data: info,
    }),

  // deleting a post
  deletePost: (post_id) =>
    axios({
      url: `/posts/${post_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // get comments for a post
  getComment: (post_id) =>
    axios({
      url: `/comment/${post_id}`,
      method: "get",
      baseURL: basePath,
    }),

  // creating a comment
  createComment: (info) =>
    axios({
      url: `/comment`,
      method: "post",
      baseURL: basePath,
      data: info,
    }),

  // delete a comment
  deleteComment: (comment_id) =>
    axios({
      url: `/comment/${comment_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // adding likes to posts/comments
  createPostLike: (info) =>
    axios({
      url: `/likes/posts`,
      method: "post",
      baseURL: basePath,
      data: info,
    }),

  createCommentLike: (info) =>
    axios({
      url: `/likes/comments`,
      method: "post",
      baseURL: basePath,
      data: info,
    }),

  // delete a like for a post/comment
  deletePostLike: (post_id, user_id) =>
    axios({
      url: `/likes/posts/${post_id}&${user_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  deleteCommentLike: (comment_id, user_id) =>
    axios({
      url: `/likes/comments/${comment_id}&${user_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // getting rsvp list
  getRsvp: (post_id) =>
    axios({
      url: `/rsvp/${post_id}`,
      method: "get",
      baseURL: basePath,
    }),

  // adding user to rsvp list
  createRsvp: (info) =>
    axios({
      url: `/rsvp`,
      method: "post",
      baseURL: basePath,
      data: info,
    }),

  // update paid column 'true' in rsvp list for a user
  updateRsvp: (post_id, user_id) =>
    axios({
      url: `/rsvp/${post_id}&${user_id}`,
      method: "put",
      baseURL: basePath,
    }),

  // remove user from an rsvp list
  deleteRsvp: (post_id, user_id) =>
    axios({
      url: `/rsvp/${post_id}&${user_id}`,
      method: "delete",
      baseURL: basePath,
    }),

  // search for people and group with a term
  searchPeopleAndGroups: (term) =>
    axios({
      url: `/search/${term}`,
      method: "get",
      baseURL: basePath,
    }),
};

