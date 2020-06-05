
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'tbroadway96', password: ''},
        {id: 2, username: 'rose2019', password: ''},
        {id: 3, username: 'lambda2019', password: ''}
      ]);
    });
};
