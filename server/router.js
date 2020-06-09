const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models');
const restrictions = require('./middleware/restrictions');

const router = express.Router();

// CREATE A USER
router.post('/api/register', async (req, res) => {
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
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(500).json({ message: 'You must provide a username and password.' });
    }

    try {
        let user = await Users.getUserByUsername(username);
        user = user[0];
        const comparison = bcrypt.compareSync(password, user.password);
        
        if (user && comparison) {
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(500).json({ 
                message: 'Could not find user with the provided username.' 
            });
        }
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Invalid username or password.'});
     }
})

// GET USERS
router.get('/api/users', restrictions, async (req, res) => {
    
    const usersList = await Users.getUsers();

    if (usersList) {
        res.status(200).json(usersList);
    } else {
        res.status(500).json({ 
            message: 'There was a problem with fetching the users data.' 
        });
    }
})

module.exports = router;
