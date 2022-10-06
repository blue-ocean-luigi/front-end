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

const port = process.env.PORT || 3001;

app.listen((port), () => {
  console.log(`Server is running on port:${port}`);
});

/* socket IO stuff */
const http = require('http').Server(app);

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000' // incoming URL for clients
  }
});

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    //socketIO.emit('messageResponse', data); // echoes data to all connected clients, clients need to filter and store messages
    socket.broadcast.emit('messageResponse', data); // echoes data to all connected clients, clients need to filter and store messages

  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(3002, () => {
  console.log('chat is listening on *:3002');
});

/* end of socket IO stuff */


