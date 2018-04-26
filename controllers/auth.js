const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  // Create a user using our user model and the body of the request
  User.create(req.body)
    .then(user => {
      // Assign a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      // send a response to the front end
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}

function login(req, res, next) {
  // Find a specific User using our user model and the email from the request
  User.findOne({ email: req.body.email })
    .then(user => {
      // If the users password isn't validates send a 401 with a message to the front end.
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // If the users password is valitdated then assign them a session token and send back a response to the front end
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
    // Object.assign overlays req.body onto the user record
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
      // if a content resourceId in the db matches the one in req.body return the user and then push the content onto that user and save it
      if(user.content.find(content => content.resourceId === req.body.content.resourceId)) return user;
      user.content.push(req.body.content);
      return user.save();
    })
    // Then send the user back to the front end as a response
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

function suggestedContentRemove(req, res, next){
  req.currentUser.suggestedContent = req.currentUser.suggestedContent.filter(suggestion => suggestion.resourceId !== req.params.suggestionId);
  req.currentUser.save()
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
  suggestedContentCreate,
  suggestedContentRemove
};
