const rp = require('request-promise');
// request-promise is like axios. its a way of formatting api requests
function searchMusic(req, res) {
  rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    // the grant type is the kind of authorization flow (no login needed)
    form: {
      grant_type: 'client_credentials'
    },
    // we send out client id and secret in the header as 'Basic id secret' (a format required by spotify)
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    // we send it as json
    json: true
  })
    .then(response => {
      return rp({
        // we then immediately fire a get request using the access_token from the response
        method: 'GET',
        // we put the access token in the header of our get request
        headers: {
          Authorization: `Bearer ${response.access_token}`
        },
        url: 'https://api.spotify.com/v1/search',
        // req.body gives us the body of a request, req.query gives the query
        qs: req.query,
        json: true
      });
    })
    .then(data => res.json(data));

}

function topMusic(req, res) {
  rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    // the grant type is the kind of authorization flow (no login needed)
    form: {
      grant_type: 'client_credentials'
    },
    // we send out client id and secret in the header as 'Basic id secret' (a format required by spotify)
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    // we send it as json
    json: true
  })
    .then(response => {
      return rp({
        // we then immediately fire a get request using the access_token from the response
        method: 'GET',
        // we put the access token in the header of our get request
        headers: {
          Authorization: `Bearer ${response.access_token}`
        },
        url: 'https://api.spotify.com/v1/users/topsify/playlists/1QM1qz09ZzsAPiXphF1l4S/tracks',
        json: true
      });
    })
    .then(data => res.json(data));

}

module.exports = {
  searchMusic,
  topMusic
};
