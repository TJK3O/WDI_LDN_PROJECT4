const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({user, token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

function show(req, res, next) {
  return User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  return User.findById(req.params.id)
    .then(content => Object.assign(content, req.body))
    .then(content => content.save())
    .then(content => res.json(content))
    .catch(next);
}

function todoCreate(req, res, next){
  return User.findById(req.params.id)
    .then(user => {
      user.content.push(req.body.content);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  register,
  login,
  show,
  update,
  todoCreate
};
