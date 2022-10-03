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

  getRsvp: async(req, res) => {
    const post_id = req.query.post_id
    try {
      const rsvp = await model.getRsvp(post_id)
      res.status(200).send(rsvp)
    } catch (error) {
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

  createPostLike: async(req, res) => {
    try {
      const like_id = await model.createPostLike(req.body);
      res.sendStatus(201)
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }

  },

  createCommentLikes: async(req, res) => {
    try {
      const like_id = await model.createCommentLike(req.body)
      res.sendStatus(201)
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }

  },

  createRsvp: async(req, res) => {
    try {
      const rsvp_id = await model.createRsvp(req.body)
      res.sendStatus(201);
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }
  },

  deletePost: async(req, res) => {
    const post_id = req.params.post_id;
    try {
      await model.deletePost(post_id);
      res.send(200);
    } catch (error) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  deleteComment: async(req, res) => {
    const comment_id = req.params.comment_id;
    try {
      await model.deleteComment(comment_id)
      res.send(200);
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }
  },

  deleteRsvp: async(req, res) => {
    const post_id = req.params.post_id
    const user_id = req.params.user_id
    try {
      await model.deleteRsvp(post_id, user_id)
      res.send(200)
    } catch (err) {
      console.log(err)
      res.sendStatus(404)
    }
  },

  getUserByEmail: async (req,res) => {
    console.log('controller path is good')
    const email = req.query.email;
    try {
      const userInfo = await model.getUserByEmail(email);
      const fg = await Promise.all([model.getFriendsOfUser(userInfo.id), model.getGroupsForUser(userInfo.id)]);
      res.status(200).send({
        info: userInfo,
        friends: fg[0],
        groups: fg[1]
      });
    } catch(err) {
      console.log(err);
      res.sendStatus(400);
    };
  },
  getUserByID: async (req,res) => {
    const id = req.query.user_id;
    try {
      const info = await Promise.all([model.getUserByID(id), model.getFriendsOfUser(id), model.getGroupsForUser(id)]);
      res.status(200).send({
        info: info[0],
        friends: info[1],
        groups: info[2]
      });
    } catch(err) {
      console.log(err);
      res.sendStatus(400);
    };
  },

  addUser: async (req,res) => {
    console.log('path to addUser')
    try {
      await model.addUser(req.body);
      res.sendStatus(202);
    } catch(err) {
      console.log(err);
      res.sendStatus(400);
    };
  },

  updateUser: async (req, res) => {
    try {
      await model.updateUser(req.body);
      res.sendStatus(200);
    } catch(err) {
      console.log(err);
      res.sendStatus(400);
    };
  },
  getFriendsOfUser: async (req, res) => {
    const id = req.query.user_id;
    try {
      const friends = await model.getFriendsOfUser(id);
      res.status(200).send(friends);
    } catch(err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  removeFriend: async (req, res) => {
    try {
      await model.removeFriend(req.params)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getGroupsForUser: async (req, res) => {
    const id = req.query.user_id
    try {
      const groups = await model.getGroupsForUser(id)
      res.status(200).json(groups)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  requestToJoinGroup: async (req, res) => {
    try {
      await model.requestToJoinGroup(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  addMemberToGroup: async (req, res) => {
    try {
      await model.addMemberToGroup(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  removeGroupMember: async (req, res) => {
    try {
      await model.removeGroupMember(req.params)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getGroupInfo: async (req, res) => {
    const id = req.query.group_id
    try {
      const groupInfo = await model.getGroupInfo(id)
      res.status(200).json(groupInfo)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getOpenGroupRequest: async (req, res) => {
    const group_id = req.query.group_id
    try {
      const openRequest = await model.getOpenGroupRequest(group_id)
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
  makeGroupAdmin: async (req, res) => {
    try {
      await model.makeGroupAdmin(req.body)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  deleteGroup: async (req,res) => {
    const group_id = req.params.group_id
    try {
      await model.deleteGroup(group_id)
      res.sendStatus(200)
    } catch(err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  getMessages: async (req, res) => {
    try {
      const messages = await model.getMessages(req.query)
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