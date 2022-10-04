const express = require('express');
const app = express();

/* socket IO stuff */
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000' // incoming URL for clients
  }
});

const connections = {}; // maps socket ids to user ids

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    console.log(data); // db handling here to save message
    connections[socket.id] = data.from;
    /*
    socket.emit('message', { // route responses
      text: 'response',
      to: 1,//connections[data.to],
      from : 2,
      at: new Date()
    });
    */
    socketIO.emit('messageResponse', data);

  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(3002, () => {
  console.log('listening on *:3001');
});

/* end of socket IO stuff */


// rest of express stuff would go here
