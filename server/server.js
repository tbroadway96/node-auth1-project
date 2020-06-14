const express = require('express');
const session = require('express-session')
const router = require('./router');
const cors = require('cors')
const helmet = require('helmet');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'sksession',
    secret: 'my secret',
    cookie: {
        maxAge: 60000, 
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore(
        {
            knex: require('../data/db-config.js'),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 60000
        }
    )
}

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig));
server.use('/', router);

module.exports = server;
