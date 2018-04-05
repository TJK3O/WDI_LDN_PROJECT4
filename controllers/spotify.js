const rp = require('request-promise');

function search(req, res) {
  rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  })
    .then(response => {
      return rp({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${response.access_token}`
        },
        url: 'https://api.spotify.com/v1/search',
        qs: req.query,
        json: true
      });
    })
    .then(data => res.json(data));

}

module.exports = {
  search
};
