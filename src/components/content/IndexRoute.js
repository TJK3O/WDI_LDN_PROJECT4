import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';
import Auth from '../../lib/Auth';

class IndexRoute extends React.Component {

  state = {
    music: {},
    films: {},
    tv: {},
    musicSearch: '',
    musicSearchResults: [],
    filmsSearch: '',
    filmsSearchResults: [],
    tvSearch: '',
    tvSearchResults: []
  }

  handleContentSelection = (e) => {
    this.setState({ selectedContent: e.target.name }, () => console.log(this.state));
    this.setState({ musicSearch: '' });
    this.setState({ filmsSearch: '' });
    this.setState({ tvSearch: '' });
  }

  handleMusicChange = (e) => {
    this.setState({ musicSearch: e.target.value }, () => console.log(this.state));
  }

  handleMusicSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/spotify', {
      params: {
        q: this.state.musicSearch,
        type: 'track'
      },
      // Now that spotify is a secure route we need to add an authorization header to the request
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ musicSearchResults: res.data.tracks.items }, () => console.log(this.state.MusicSearchResults)));
  }

  handleFilmsChange = (e) => {
    this.setState({ filmsSearch: e.target.value }, () => console.log(this.state));
  }

  handleFilmsSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/tmdbmovies', {
      params: {
        query: this.state.filmsSearch
      },
      // Now that spotify is a secure route we need to add an authorization header to the request
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ filmsSearchResults: res.data.results }, () => console.log(this.state.filmsSearchResults)));
  }

  handleTvChange = (e) => {
    this.setState({ tvSearch: e.target.value }, () => console.log(this.state));
  }

  handleTvSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/tmdbTv', {
      params: {
        query: this.state.tvSearch
      },
      // Now that spotify is a secure route we need to add an authorization header to the request
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ tvSearchResults: res.data.results }, () => console.log(this.state.tvSearchResults)));
  }

  componentDidMount() {
    if(!this.state.selectedContent) {
      this.setState({ selectedContent: 'music' });
      axios.get('/api/spotify/topMusic', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ music: res.data }));

      axios.get('/api/tmdbmovies/topFilms', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ films: res.data }));

      axios.get('/api/tmdbtv/topTv', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ tv: res.data }));

      axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ users: res.data }));
    }
  }

  render() {
    return (
      <section>
        <h1>Index</h1>
        <div>
          <a
            onClick={this.handleContentSelection}
            name="music"
          >music</a> |
          <a
            onClick={this.handleContentSelection}
            name="films"
          > films</a> |
          <a
            onClick={this.handleContentSelection}
            name="tv"
          > tv</a> |
          <a
            onClick={this.handleContentSelection}
            name="users"
          > users</a>
        </div>
        {this.state.selectedContent === 'music' &&
        <Search
          handleChange={this.handleMusicChange}
          handleSubmit={this.handleMusicSubmit}
        />
        }
        {this.state.selectedContent === 'films' &&
        <Search
          handleChange={this.handleFilmsChange}
          handleSubmit={this.handleFilmsSubmit}
        />
        }
        {this.state.selectedContent === 'tv' &&
        <Search
          handleChange={this.handleTvChange}
          handleSubmit={this.handleTvSubmit}
        />
        }
        {this.state.selectedContent === 'music' && this.state.musicSearch &&
        <ul className="columns is-multiline">
          {this.state.musicSearchResults.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.musicSearchResults &&
                <Link to={`/content/music/${this.state.musicSearchResults[i].external_ids.isrc}`}>
                  <img src={track.album.images[0].url} />
                </Link>}
            </div>)}
        </ul>
        }
        {this.state.music.items && !this.state.musicSearch && this.state.selectedContent === 'music' &&
        <ul className="columns is-multiline">
          {this.state.music.items.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.music.items &&
                <Link to={`/content/music/${this.state.music.items[i].track.external_ids.isrc}`}>
                  <img src={track.track.album.images[0].url} />
                </Link>}
            </div>
          )}
        </ul>
        }

        {this.state.films.results && !this.state.filmsSearch && this.state.selectedContent === 'films' &&
        <ul className="columns is-multiline">
          {this.state.films.results.map((film, i) =>
            <div key={i} className="column is-one-third">
              {this.state.films.results &&
                <Link to={`/content/films/${this.state.films.results[i].id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
                </Link>
              }
            </div>
          )}
        </ul>
        }
        {this.state.selectedContent === 'films' && this.state.filmsSearch &&
        <ul className="columns is-multiline">
          {this.state.filmsSearchResults.map((film, i) =>
            <div key={i} className="column is-one-third">
              {this.state.filmsSearchResults &&
                <Link to={`/content/films/${this.state.filmsSearchResults[i].id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
                </Link>}
            </div>)}
        </ul>
        }

        {this.state.tv.results && !this.state.tvSearch && this.state.selectedContent === 'tv' &&
        <ul className="columns is-multiline">
          {this.state.tv.results.map((tv, i) =>
            <div key={i} className="column is-one-third">
              {this.state.tv.results &&
                <Link to={`/content/tv/${this.state.tv.results[i].id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} />
                </Link>
              }
            </div>
          )}
        </ul>
        }
        {this.state.selectedContent === 'tv' && this.state.tvSearch &&
        <ul className="columns is-multiline">
          {this.state.tvSearchResults.map((tv, i) =>
            <div key={i} className="column is-one-third">
              {this.state.filmsSearchResults &&
                <Link to={`/content/${this.state.tvSearchResults[i].id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} />
                </Link>}
            </div>)}
        </ul>
        }
        {this.state.selectedContent === 'users' &&
        <ul className="columns is-multiline">
          {this.state.users.map((user, i) =>
            <div key={i} className="column is-one-third">
              <Link to={`/user/${this.state.users[i]._id}`}>
                <h1>{user.username}</h1>
              </Link>
            </div>
          )}
        </ul>
        }
      </section>
    );
  }
}

export default IndexRoute;
