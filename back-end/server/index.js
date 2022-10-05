require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes.js");
const pool = require('../db/postgres.js')
const morgan = require('morgan')

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/crossing", router);

/* socket IO stuff */
const http = require('http').Server(app);

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
    socket.emit('message', { // route responses
      text: 'response',
      to: 1,//connections[data.to],
      from : 2,
      at: new Date()
    });
    socketIO.emit('messageResponse', data);

  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(3002, () => {
  console.log('chat is listening on *:3002');
});

/* end of socket IO stuff */

const port = process.env.PORT || 3001;

app.listen((port), () => {
  console.log(`Server is running on port:${port}`);
});
