require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// create the express app
const app = express();

// create the http server
const server = http.createServer(app);

// initialize socketio var
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// listen for the connection event
io.on('connection', (socket) => {
  // welcome message
  socket.emit('message', 'Welcome to ChatCord!');

  // broadcast when a user connects
  // broadcast to all users except the user who is connecting
  socket.broadcast.emit('message', 'A user has joined the chat.');

  // run when a client disconnets
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat.');
  });

  // listen for the chat message
  socket.on('chatMessage', (msg) => {
    // emit the message to everyone
    io.emit('message', msg);
  });
});

// setup the port
const port = process.env.PORT || 5000;

// listen for requests
server.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
