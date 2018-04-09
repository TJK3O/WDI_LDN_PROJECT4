const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = require('../models/User');

const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create([  {
    username: 'Tom',
    email: 'tom@me.com',
    password: 'password',
    passwordConfirmation: 'password',
    content: [],
    musicLoverBadge: '',
    filmLoverBadge: ''
  }])
    .then(users => console.log(`${users.length} users created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
