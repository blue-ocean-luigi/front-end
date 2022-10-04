const please = require('../request');

const func = () => {
   please.getUserByEmail('email6@gmail.com')
     .then((results) => console.log(results.data))
     .catch((err) => console.log(err));

  // please.getUserByID(2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.addUser('joe', 'mama', 'ha@gamil.com', 'goteems', 'picture url')
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.updateUser('joe', 'mama', 'ha@gamil.com', 'goteems, jk', 'picture url', 12)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.getFriendsOfUser(2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.getGroupsOfUser(4)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.removeFriend(2, 4)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.requestFriend(7, 2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.acceptFriend(7, 2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.requestToJoinGroup(1, 7, 'hello new friends')
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.getGroupInfo(3)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.getOpenGroupRequest(3)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.createNewGroup(2, 'drunk buddies', 'we dont remember', 'CA', 'drink', '54322')
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.acceptGroupRequest(1, 3)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.giveMemberAdminStatus(1, 2)
  //  .then((results) => console.log(results.data))
  //  .catch((err) => console.log(err));

  // please.removeGroupMember(7, 2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.deleteGroup(7)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.getMessages(1, 2)
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));

  // please.postMessage(1, 2, 'what you doing?')
  //   .then((results) => console.log(results.data))
  //   .catch((err) => console.log(err));
};

func();
