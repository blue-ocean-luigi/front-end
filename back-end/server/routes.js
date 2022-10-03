const router = require('express').Router();
const controller = require('./controller.js');

//users
router.get('/user/info/email', controller.getUserByEmail)
router.get('/user/info/id', controller.getUserByID)
router.post('/user/add', controller.addUser)
router.put('/user/update', controller.updateUser)
router.get('/user/friends', controller.getFriendsOfUser)
router.get('/user/groups', controller.getGroupsForUser)
router.delete('/user/friends/:user_id&:friend_id', controller.removeFriend)

//groups
router.post('/groups/joinrequest', controller.requestToJoinGroup)
router.get('/groups/info', controller.getGroupInfo)
router.get('/groups/request', controller.getOpenGroupRequest)
router.post('/groups/create', controller.createGroup)
router.post('/groups/accept', controller.addMemberToGroup)
router.put('/groups/admin', controller.makeGroupAdmin)
router.delete('/groups/memeber/:group_id&:user_id', controller.removeGroupMember)
router.delete('/groups/:group_id', controller.deleteGroup)

//messages
router.get('/messages/user', controller.getMessages)
router.post('/messages/all', controller.postMessage)

module.exports = router