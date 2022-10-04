const router = require('express').Router();
const controller = require('./controller.js');

//posts
router.get('/userposts/:user_id', controller.getUserPosts)
router.get('/groupposts/:group_id', controller.getGroupPosts)
router.post('/posts', controller.createPost)
router.delete("/posts/:post_id", controller.deletePost);
//comments
router.post('/comment', controller.createComment)
router.delete('/comment/:comment_id', controller.deleteComment)
//likes
router.post('/likes/posts', controller.createPostLike)
router.post('/likes/comments', controller.createCommentLike)
router.delete('/likes/posts/:post_id&:user_id', controller.deletePostLike)
router.delete('/likes/comments/:comment_id&:user_id', controller.deleteCommentLike)

//rsvp
router.get('/rsvp/:post_id', controller.getRsvp)
router.post('/rsvp', controller.createRsvp)
router.put('/rsvp/:post_id&:user_id', controller.updateRsvp)
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
