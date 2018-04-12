const router = require('express').Router();
// we import the spotify controller for the function it contains (an rp post request to obtain a token followed by a get request using the token)
const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');
const content = require('../controllers/content');
const spotify = require('../controllers/spotify');
const tmdb = require('../controllers/tmdb');

router.route('/spotify/topMusic')
  .get(secureRoute, spotify.topMusic);

// when a get request is sent to /api/spotify it will use the request body in the spotify search function we have just imported
router.route('/spotify')
  .get(secureRoute, spotify.searchMusic);

router.route('/tmdbmovies/show/:id')
  .get(secureRoute, tmdb.showFilm);

router.route('/tmdbmovies/topFilms')
  .get(secureRoute, tmdb.topFilms);

router.route('/tmdbmovies')
  .get(secureRoute, tmdb.searchFilms);

router.route('/tmdbtv/show/:id')
  .get(secureRoute, tmdb.showTv);

router.route('/tmdbtv/topTv')
  .get(secureRoute, tmdb.topTv);

router.route('/tmdbTv')
  .get(secureRoute, tmdb.searchTv);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/user/:id')
  .get(secureRoute, auth.show);


router.route('/user/:id/suggestion')
  .post(secureRoute, auth.suggestedContentCreate);

router.route('/user/:id/suggestion/:suggestionId')
  .delete(secureRoute, auth.suggestedContentRemove);

router.route('/user')
  .get(secureRoute, auth.index);

router.route('/user/:id/content/:id')
  .put(secureRoute, content.update);

router.route('/user/:id/follow')
// if we follow/unfollow we post or delete their userId from our user record. On the post route we need to populate the user so that they are an object and not just an ObjectId
  .post(secureRoute, auth.followUser)
  .delete(secureRoute, auth.unFollowUser);

router.route('/user/:id/content')
  // .get(content.index)
  .put(secureRoute, auth.todoCreate);

// this user show route can now be the currently logged in user or another user
router.route('/user/:id')
  .get(secureRoute, auth.show)
  .put(secureRoute, auth.update);


router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found'}));

module.exports = router;
