const router = require('express').Router();
// secureRoute contains a function to check whether a user is logged in
const secureRoute = require('../lib/secureRoute');
// auth contains functions to register, login a user etc.
const auth = require('../controllers/auth');
// content contains functions for creating, editing content etc.
const content = require('../controllers/content');
// we import the spotify controller for the function it contains (an rp post request to obtain a token followed by a get request using the token)
const spotify = require('../controllers/spotify');
// tmdb makes the requests to the API and responds to our front end
const tmdb = require('../controllers/tmdb');

// This deals with requests from our front end for the top music on Spotify
router.route('/spotify/topMusic')
  .get(secureRoute, spotify.topMusic);

// when a get request is sent to /api/spotify it will use the request body in the spotify search function we have just imported
router.route('/spotify')
  .get(secureRoute, spotify.searchMusic);

// This will make a request for the specific film we have supplied the id for
router.route('/tmdbmovies/show/:id')
  .get(secureRoute, tmdb.showFilm);

// This will request the top films
router.route('/tmdbmovies/topFilms')
  .get(secureRoute, tmdb.topFilms);

//This will search for a film using the query string we passed through from the front end
router.route('/tmdbmovies')
  .get(secureRoute, tmdb.searchFilms);

// This will make a request for the specific tv show we have supplied the id for
router.route('/tmdbtv/show/:id')
  .get(secureRoute, tmdb.showTv);

// This will request the top tv shows
router.route('/tmdbtv/topTv')
  .get(secureRoute, tmdb.topTv);

//This will search for a tv show using the query string we passed through from the front end
router.route('/tmdbTv')
  .get(secureRoute, tmdb.searchTv);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/user/:id')
  .get(secureRoute, auth.show);

// This will add a content to the users record
router.route('/user/:id/suggestion')
  .post(secureRoute, auth.suggestedContentCreate);

// This will delete a specific suggestion from the users record
router.route('/user/:id/suggestion/:suggestionId')
  .delete(secureRoute, auth.suggestedContentRemove);

router.route('/user')
  .get(secureRoute, auth.index);

// This will update the users profile when they use the front end edit route
router.route('/user/:id/content/:id')
  .put(secureRoute, content.update);

router.route('/user/:id/follow')
// if we follow/unfollow we post or delete their userId from our user record. On the post route we need to populate the user so that they are an object and not just an ObjectId
  .post(secureRoute, auth.followUser)
  .delete(secureRoute, auth.unFollowUser);

router.route('/user/:id/content')
  .put(secureRoute, auth.todoCreate);

// this user show route can now be the currently logged in user or another user
router.route('/user/:id')
  .get(secureRoute, auth.show)
  .put(secureRoute, auth.update);


router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found'}));

module.exports = router;
