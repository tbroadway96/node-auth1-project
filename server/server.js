const express = require('express');
const router = require('./usersRouter');

const server = express();
server.use(express.json());

server.use('/api/register', router);
server.use('/api/login', router);
server.use('/api/users', router);

module.exports = server;
