const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models');

const server = express();
server.use(express.json());

// CREATE A USER
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

// USER LOGIN
server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(500).json({ message: 'You must provide a username and password.' });
    }

    try {
        let user = await Users.getUserByUsername(username);
        user = user[0];
        console.log(user);
        const comparison = bcrypt.compareSync(password, user.password);
        
        if (user && comparison) {
            res.status(200).json({ message: 'Logged in.' });
        } else {
            res.status(500).json({ message: 'Your password is incorrect.' });
        }
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ message: 'Invalid username or password.'});
     }
})

// GET USERS
server.get('/api/users', async (req, res) => {
    
    const usersList = await Users.getUsers();

    if (usersList) {
        res.status(200).json(usersList);
    } else {
        res.status(500).json({ 
            message: 'There was a problem with fetching the users data.' 
        });
    }
})

module.exports = server;
