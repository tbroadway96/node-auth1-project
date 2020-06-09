const express = require('express');
const session = require('express-session')
const router = require('./router');
const cors = require('cors')
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'anyNameforSession',
    secret: 'AnySecret',
    cookie: {
        maxAge: 60000, //Milliseconds
        secure: false, // should be true in production
        httpOnly: true //only for Http use
    },
    resave: false,
    saveUninitialized: false,

    //Configuration to store session in Database using knex
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
server.use(session(sessionConfig));
server.use('/', router);

module.exports = server;
