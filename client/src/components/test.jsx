const please = require('../request');

const func = () => {
  // please.getUserByEmail('email6@gmail.com')
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.getUserByID(2)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.addUser('joe', 'mama', 'ha@gamil.com', 'goteems', 'picture url')
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.updateUser('joe', 'mama', 'ha@gamil.com', 'goteems, jk', 'picture url', 12)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  please.getFriendsOfUser(2)
  .then((results) => console.log(results.data))
  .catch((err) => console.log(err));

  // please.getGroupsOfUser(4)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.removeFriend(2, 4)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.requestToJoinGroup(group_id, user_id, message)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.getGroupInfo(group_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.getOpenGroupRequest(group_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.createNewGroup(name, about, state, city, zip)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.acceptGroupRequest(group_id, user_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.makeMemberAdmin(group_id, user_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.removeGroupMember(group_id, user_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.deleteGroup(group_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.getMessages(user_id, friend_id)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))

  // please.postMessage(sender_id, receiver_id, message)
  // .then((results) => console.log(results.data))
  // .catch((err) => console.log(err))
}


func()