const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models');

const server = express();
server.use(express.json());

server.post('/api/register', async (req, res) => {
    let body = req.body;

    if (!body.username || !body.password) {
        res.status(500).json({ message: 'You must provide a username & password.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(body.password, salt);
    body.password = hash;

    const newUser = await Users.createUser(body);

    if (newUser) {
        res.status(200).json(newUser);
    } else {
        res.status(500).json({ 
            message: 'There was a problem with creating your account'
        });
    }
})

module.exports = server;
