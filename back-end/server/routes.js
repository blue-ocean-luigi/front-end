const router = require('express').Router();
const controller = require('./controller.js');

//posts
router.get('/userposts', controller.getUserPosts)
router.get('/groupposts', controller.getGroupPosts)
router.post('/posts', controller.createPost)
router.delete("/posts/:post_id", controller.deletePost);
//comments
router.post('/comment', controller.createComment)
router.delete('comment/:comment_id')
//likes
router.post('/likes/posts', controller.createPostLike)
router.post('/likes/comments', controller.createCommentLikes)

//rsvp
router.get('/rsvp', controller.getRsvp)
router.post('/rsvp', controller.createRsvp)
router.delete('/rsvp/:post_id&:user_id', controller.deleteRsvp)


//users
router.get('/user/info/email', controller.getUserByEmail)
router.get('/user/info/id', controller.getUserByID)
router.post('/user/add', controller.addUser)
router.put('/user/update', controller.updateUser)
router.get('/user/groups', controller.getGroupsForUser)
router.delete('/user/friends/:user_id&:friend_id', controller.removeFriend)
router.get('/user/friends', controller.getFriendsOfUser)

//friends
router.post('/friends/request', controller.requestToBeFriends)
router.put('/friends/accept', controller.acceptFriendRequest)
router.get('/friends/check', controller.checkIfFriends)

//groups
router.post('/groups/joinrequest', controller.requestToJoinGroup)
router.get('/groups/info', controller.getGroupInfo)
router.get('/groups/request', controller.getOpenGroupRequest)
router.post('/groups/create', controller.createGroup)
router.post('/groups/accept', controller.addMemberToGroup)
router.put('/groups/admin', controller.makeGroupAdmin)
router.delete('/groups/member/:group_id&:user_id', controller.removeGroupMember)
router.delete('/groups/:group_id', controller.deleteGroup)

//messages
router.get('/messages/user', controller.getMessages)
router.post('/messages/all', controller.postMessage)

module.exports = router

//     const query = `WITH gigachad as (
//       SELECT p.id as post_id,
//             p.group_id as group_id,
//             g.name as groupname,
//             p.user_id as author_id,
//             u.firstName as firstName,
//             u.lastName as lastName,
//             picture,
//             content,
//             createdAt as date,
//             isEvent,
//             p.name as eventName,
//             p.state as state,
//             p.city as city,
//             p.zip as zip,
//             startTime,
//             startDate,
//             endTime,
//             endDate,
//             payment_amt
//     FROM groups g INNER JOIN group_members gm
//     ON g.id = gm.group_id
//     INNER JOIN posts p ON p.group_id = g.id
//     INNER JOIN users u ON p.user_id = u.id
//     WHERE gm.user_id = ${user_id})

// SELECT post_id,
//     group_id,
//     groupname,
//     author_id,
//     firstName,
//     lastName,
//     picture,
//     content,
//     date,
//     isEvent,
//     eventName,
//     state,
//     city,
//     zip,
//     startTime,
//     startDate,
//     endTime,
//     endDate,
//     payment_amt,

//     COALESCE(
//   (SELECT json_agg(json_build_object('photo_id', id, 'url', url))
//   FROM
//       (SELECT pp.id,
//         url
//       FROM post_photos pp
//       WHERE pp.post_id = gigachad.post_id) pictures), '[]'::json) AS photos,
//       COALESCE(
//   (SELECT json_agg(json_build_object('id', user_id, 'firstName', firstName, 'lastName', lastName))
//   FROM
//       (SELECT l.user_id,
//         firstName,
//         lastName
//       FROM users INNER JOIN post_likes l
//       ON users.id = l.user_id
//       WHERE l.post_id = gigachad.post_id) likes), '[]'::json) AS postLikes,
//       COALESCE(
//   (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstName, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt,
//   'likes', clikes))
//   FROM
//       (SELECT c.id,
//         c.user_id,
//         firstName,
//         lastName,
//         picture,
//         message,
//         createdAt,
//         COALESCE((SELECT json_agg(json_build_object(
//           'id', user_id,
//           'firstName', firstName,
//           'lastName', lastName
//         )) cnames
//       FROM
//           (SELECT cl.user_id,
//             firstName,
//             lastName
//           FROM users INNER JOIN comment_likes cl
//           ON cl.user_id = users.id) comms), '[]'::json) clikes
//       FROM comments c INNER JOIN users u
//       ON c.user_id = u.id
//       WHERE c.post_id = gigachad.post_id
//       ORDER BY createdAt ASC) comment), '[]'::json) AS comments
//       FROM gigachad
//       ORDER BY date DESC`;