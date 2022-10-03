/* eslint-disable camelcase */
const axios = require('axios');

const basePath = 'http://localHost:3001/crossing';

module.exports = {

  // get user info/friends/groups by email after authorization
  getUserByEmail: async (email) => axios({
    url: '/user/info/email',
    method: 'get',
    baseURL: basePath,
    params: { email },
  }),

  // get user info/friends/groups by id
  getUserByID: (user_id) => axios({
    url: '/user/info/id',
    method: 'get',
    baseURL: basePath,
    params: { user_id },
  }),

  // post new user to db
  addUser: (firstname, lastname, email, aboutme, picture) => axios({
    url: '/user/add',
    method: 'post',
    baseURL: basePath,
    data: {
      firstname, lastname, email, aboutme, picture,
    },
  }),

  // update user info (need all arguments)
  updateUser: (firstname, lastname, email, aboutme, picture, user_id) => axios({
    url: '/user/update',
    method: 'put',
    baseURL: basePath,
    data: {
      firstname, lastname, email, aboutme, picture, user_id,
    },
  }),

  // get user friends
  getFriendsOfUser: (user_id) => axios({
    url: '/user/friends',
    method: 'get',
    baseURL: basePath,
    params: { user_id },
  }),

  // get user groups
  getGroupsOfUser: (user_id) => axios({
    url: '/user/groups',
    method: 'get',
    baseURL: basePath,
    params: { user_id },
  }),

  // remove from friends list
  removeFriend: (user_id, friend_id) => axios({
    url: `/user/friends/${user_id}&${friend_id}`,
    method: 'delete',
    baseURL: basePath,
  }),

  // request to join group
  requestToJoinGroup: (group_id, user_id, message) => axios({
    url: '/groups/joinrequest',
    method: 'post',
    baseURL: basePath,
    data: { group_id, user_id, message },
  }),

  // get group info/members
  getGroupInfo: (group_id) => axios({
    url: '/groups/info',
    method: 'get',
    baseURL: basePath,
    params: { group_id },
  }),

  // get all open request for a group
  getOpenGroupRequest: (group_id) => axios({
    url: '/groups/request',
    method: 'get',
    baseURL: basePath,
    params: { group_id },
  }),

  // create a new group
  createNewGroup: (name, about, state, city, zip) => axios({
    url: '/groups/create',
    method: 'post',
    baseURL: basePath,
    data: {
      name, about, state, city, zip,
    },
  }),

  // accept new member group request
  acceptGroupRequest: (group_id, user_id) => axios({
    url: '/group/accept',
    method: 'post',
    baseURL: basePath,
    data: { group_id, user_id },
  }),

  // make group member and admin
  makeMemberAdmin: (group_id, user_id) => axios({
    url: '/groups/admin',
    method: 'put',
    baseURl: basePath,
    data: { group_id, user_id },
  }),

  // kick member out of group
  removeGroupMember: (group_id, user_id) => axios({
    url: `/groups/member/${group_id}&${user_id}`,
    method: 'delete',
    baseURL: basePath,
  }),

  // delete group
  deleteGroup: (group_id) => axios({
    url: `/groups/${group_id}`,
    method: 'delete',
    baseURL: basePath,
  }),

  // get all messages between user and friend
  getMessages: (user_id, friend_id) => axios({
    url: '/messages/user',
    method: 'get',
    baseURL: basePath,
    params: { user_id, friend_id },
  }),

  // post message
  postMessage: (sender_id, receiver_id, message) => axios({
    url: '/message/all',
    method: 'post',
    baseURL: basePath,
    data: { sender_id, receiver_id, message },
  }),
};
