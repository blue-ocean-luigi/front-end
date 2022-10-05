import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

socket.on('message', (data) => {
  console.log(data);
});
socket.on('messageResponse', (data) => {
  console.log(data);
});

export default socket;
