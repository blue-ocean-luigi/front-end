const router = require('express').Router();
const controller = require('./controller.js');

router.get('/userposts', controller.getUserPosts)
router.get('/groupposts', controller.getGroupPosts)
router.post('/posts', controller.createPost)
router.post('/comment', controller.createComment)
router.delete('/posts', controller.deletePost)

module.exports = router