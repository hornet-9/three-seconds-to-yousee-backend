/* global io */

// Create a websocket connecting to our Feathers server
const socket = io('http://localhost:3030');

// Listen to new messages being created
socket.on('news', message =>
  console.log('Coordinates', message)
);
