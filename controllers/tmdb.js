const rp = require('request-promise');
// request-promise is like axios. its a way of formatting api requests
function searchFilms(req, res) {
  return rp({
    // we then immediately fire a get request using the access_token from the response
    method: 'GET',
    // we put the access token in the header of our get request
    url: 'https://api.themoviedb.org/3/search/movie?api_key=97afb868878559b1e26dfa5d00ed3a2a&language=en-US',
    // req.body gives us the body of a request, req.query gives the query
    qs: req.query,
    json: true
  })

    .then(data => res.json(data));

}

function topFilms(req, res) {
  return rp({
    // we then immediately fire a get request using the access_token from the response
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=97afb868878559b1e26dfa5d00ed3a2a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
    json: true
  })
    .then(data => res.json(data));

}

function searchTv(req, res) {
  return rp({
    // we then immediately fire a get request using the access_token from the response
    method: 'GET',
    // we put the access token in the header of our get request
    url: 'https://api.themoviedb.org/3/search/tv?api_key=97afb868878559b1e26dfa5d00ed3a2a&language=en-US',
    // req.body gives us the body of a request, req.query gives the query
    qs: req.query,
    json: true
  })

    .then(data => res.json(data));

}

function topTv(req, res) {
  return rp({
    // we then immediately fire a get request using the access_token from the response
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/tv?api_key=97afb868878559b1e26dfa5d00ed3a2a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
    json: true
  })
    .then(data => res.json(data));

}

module.exports = {
  searchFilms,
  topFilms,
  searchTv,
  topTv
};
