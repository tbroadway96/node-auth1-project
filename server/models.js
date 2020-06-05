const db = require('../data/db-config');

const createUser = (user) => {
    return db('users').insert(user);
}

const getUsers = () => {
    return db.select('*').from('users');
}

module.exports = {
    createUser,
    getUsers
}
