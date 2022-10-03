const router = require('express').Router();
const controller = require('./controller.js');

router.get('/userposts', controller.getUserPosts)
router.get('/groupposts', controller.getGroupPosts)
router.post('/posts', controller.createPost)
router.post('/comment', controller.createComment)
router.delete('/posts', controller.deletePost)
//users
router.get('/user/info', controller.getUser)
router.post('/user/add', controller.addUser)
router.put('/user/update', controller.updateUser)
router.get('/user/friends', controller.getFriendsOfUser)
router.get('/user/groups', controller.getGroupsForUser)

//groups
router.post('/groups/joinrequest', controller.requestToJoinGroup)
router.get('/groups/info', controller.getGroupInfo)
router.get('/groups/request', controller.getOpenGroupRequest)
router.post('/groups/create', controller.createGroup)

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
//       ON users.id = l.user_id) likes), '[]'::json) AS postLikes,
//       COALESCE(
//   (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstName, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt))
//   FROM
//       (SELECT c.id,
//         c.user_id,
//         firstName,
//         lastName,
//         picture,
//         message,
//         createdAt
//       FROM comments c INNER JOIN users u
//       ON c.user_id = u.id
//       WHERE c.post_id = gigachad.post_id
//       ORDER BY createdAt ASC) comment), '[]'::json) AS comments
//       FROM gigachad
//       ORDER BY date DESC`;