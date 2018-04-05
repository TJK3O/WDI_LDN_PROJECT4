const router = require('express').Router();
const spotify = require('../controllers/spotify');

router.route('/spotify')
  .get(spotify.search);

module.exports = router;
