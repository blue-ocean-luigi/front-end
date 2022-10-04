const router = require('express').Router();
const controller = require('./controller.js');

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