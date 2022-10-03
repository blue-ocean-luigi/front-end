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
  },

  getUser: async (req,res) => {
    const email = req.query.email
    try {
      let user = await model.getUser(email)
      res.status(200).send(user)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },

  addUser: async (req,res) => {
    try {
      await model.addUser(req.body)
      res.sendStatus(202)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },

  updateUser: async (req, res) => {
    try {
      await model.updateUser(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getFriendsOfUser: async (req, res) => {
    const id = req.query.id
    try {
      let friends = await model.getFriendsOfUser(id)
      res.status(200).send(friends)
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getGroupsForUser: async (req, res) => {
    const id = req.query.id
    try {
      let groups = await model.getGroupsForUser(id)
      res.status(200).json(groups)
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  requestToJoinGroup: async (req, res) => {
    try {
      await model.requestToJoinGroup(req.body)
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getGroupInfo: async (req, res) => {
    const id = req.query.id
    try {
      let groupInfo = await model.getGroupInfo(id)
      res.status(200).json(groupInfo)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getOpenGroupRequest: async (req, res) => {
    const group_id = req.query.group_id
    try {
      let openRequest = await model.getOpenGroupRequest(group_id)
      res.status(200).send(openRequest)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  createGroup: async (req, res) => {
    try {
      await model.createGroup(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getMessages: async (req, res) => {
    try {
      let messages = await model.getMessages(req.query)
      res.status(200).json(messages)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  postMessage: async (req, res) => {
    try {
      await model.postMessage(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  }
}