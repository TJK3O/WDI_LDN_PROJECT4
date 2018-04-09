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

router.route('/user/:id/content')
  // .get(content.index)
  .put(auth.todoCreate);

router.route('/user/:id')
  .get(auth.show)
  // HERE
  .put(auth.update);

router.route('/user/:id/content/:id')
  .put(secureRoute, content.update);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found'}));

module.exports = router;
