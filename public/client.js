/* global io */

// Create a websocket connecting to our Feathers server
const socket = io('https://threesecondsyousee.herokuapp.com/');

socket.on('news', message => {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(message.north + ', ' + message.east);
    node.appendChild(textnode);
    document.getElementById("list1").appendChild(node);
  }
);
