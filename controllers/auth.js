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
  // Because we pushed in the user's ObjectId only when we followed a user, we need to populate their id so that we get the object here on the show route.
    .populate('followedUsers')
    .then(user => res.json(user))
    .catch(next);
}

function index(req, res, next) {
  return User.find()
    .then(user => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  return User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => {
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function todoCreate(req, res, next){
  return User.findById(req.params.id)
    .then(user => {
      if(user.content.find(content => content.resourceId === req.body.content.resourceId)) return user;
      user.content.push(req.body.content);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function suggestedContentCreate(req, res, next){
  return User.findById(req.params.id)
    .then(user => {
      if(user.suggestedContent.find(content => content.resourceId === req.body.content.resourceId)) return user;
      user.suggestedContent.push(req.body.content);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function followUser(req, res, next){
  // req.currentUser was created in secureRoute. Req.params.id is the id in the url of whoevers profile page we are on. So here we are pushing the id of the user whose page we are on into the current user's followedUsers. We will need to populate followedUsers on the show route so that followedUsers are objects rather than ObjectIds. This is done in the show function.
  req.currentUser.followedUsers.push(req.params.id);
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

function unFollowUser(req, res, next){
  // this filter will return all user objects whose userId is not equal to req.params.id (this is the id of the user whose profile page we are on and their id comes from the url)
  req.currentUser.followedUsers = req.currentUser.followedUsers.filter(userId => !userId.equals(req.params.id));
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  register,
  login,
  show,
  index,
  update,
  todoCreate,
  followUser,
  unFollowUser,
  suggestedContentCreate
};
