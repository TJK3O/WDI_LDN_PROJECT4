const router = require('express').Router();
// we import the spotify controller for the function it contains (an rp post request to obtain a token followed by a get request using the token)
const auth = require('../controllers/auth');
const spotify = require('../controllers/spotify');
// when a get request is sent to /api/spotify it will use the request body in the spotify search function we have just imported
router.route('/spotify')
  .get(spotify.search);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found'}));

module.exports = router;
