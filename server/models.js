const db = require('../data/db-config');

const createUser = (user) => {
    return db('users').insert(user);
}

const getUsers = () => {
    return db.select('*').from('users');
}

const getUserByUsername = (username) => {
    return db.select('*').from('users').where({ username: username });
}

module.exports = {
    createUser,
    getUsers,
    getUserByUsername
}
