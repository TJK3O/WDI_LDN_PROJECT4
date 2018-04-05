const router = require('express').Router();
// we import the spotify controller for the function it contains (an rp post request to obtain a token followed by a get request using the token)
const spotify = require('../controllers/spotify');

// when a get request is sent to /api/spotify it will use the request body in the spotify search function we have just imported
router.route('/spotify')
  .get(spotify.search);

module.exports = router;
