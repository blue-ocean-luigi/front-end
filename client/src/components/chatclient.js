import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

  /*
    on message response, the message data needs to be added to messages
    if to or from contains the usersID
  */

export default socket;
