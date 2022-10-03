const model = require('./model.js');

module.exports = {
  getUserPosts: async(req, res) => {
    const user_id = req.query.user_id;
    try {
      const posts = await model.getUserPosts(user_id);
      res.status(200).send(posts);
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }
  },

  getGroupPosts: async(req, res) => {
    const group_id = req.query.group_id
    try {
      const posts = await model.getGroupPosts(group_id);
      res.status(200).send(posts);
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }

  },

  createPost: async(req, res) => {
    try {
      const post_id = await model.createPost(req.body);
      res.sendStatus(201);
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }
  },

  createComment: async(req, res) => {
    try {
      const comment_id = await model.createComment(req.body);
      res.sendStatus(201);
    } catch (error) {
      console.log(err);
      res.sendStatus(404);
    }

  },

  deletePost: async(req, res) => {
    const post_id = req.body.post_id;
    try {
      await model.deletePost(post_id);
      res.send(200);
    } catch (error) {
      console.log(err);
      res.sendStatus(404);
    }


  }
}