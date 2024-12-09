const http = require('http');
const { Server } = require('socket.io');

let io;

const socketSetup = (app) => {
  const server = http.createServer(app);
  io = new Server(server);

  return server;
};

const handleNewMessage = (data) => {
  io.emit('message posted', data);
};

module.exports = {
  socketSetup,
  handleNewMessage,
};
