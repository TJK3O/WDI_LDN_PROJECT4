import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';
import Auth from '../../lib/Auth';

class IndexRoute extends React.Component {

  state = {
    music: {},
    films: {},
    musicSearch: '',
    musicSearchResults: [],
    filmsSearch: '',
    filmsSearchResults: []
  }

  handleContentSelection = (e) => {
    this.setState({ selectedContent: e.target.name }, () => console.log(this.state));
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

  componentDidMount() {
    if(!this.state.selectedContent) {
      this.setState({ selectedContent: 'music' });
      axios.get('/api/spotify/topFifty', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ music: res.data }, () => console.log(this.state)));

      axios.get('/api/tmdbmovies', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ films: res.data }, () => console.log(this.state)));

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
          >films</a> |
          <a
            onClick={this.handleContentSelection}
            name="tv"
          >tv</a>
        </div>
        <Search
          handleChange={this.handleMusicChange}
          handleSubmit={this.handleMusicSubmit}
        />
        <ul className="columns is-multiline">
          {this.state.musicSearchResults.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.musicSearchResults &&
                <Link to={`/content/${this.state.musicSearchResults[i].external_ids.isrc}`}>
                  <img src={track.album.images[0].url} />
                </Link>}
            </div>)}
        </ul>
        {this.state.music.items && !this.state.musicSearch && this.state.selectedContent === 'music' &&
        <ul className="columns is-multiline">
          {this.state.music.items.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.music.items &&
                <Link to={`/content/${this.state.music.items[i].track.external_ids.isrc}`}>
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
                  <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
              }
            </div>
          )}
        </ul>
        }
      </section>
    );
  }
}

export default IndexRoute;



// fetchFilms = () => {
//   axios.get('/api/tmdbmovies', {
//     headers: {
//       Authorization: `Bearer ${Auth.getToken()}`
//     }
//   })
//     .then(res => console.log(`here is res: ${res}`));
// }
//
// fetchMusic = () => {
//   axios.get('/api/spotify/topFifty', {
//     headers: {
//       Authorization: `Bearer ${Auth.getToken()}`
//     }
//   })
//     .then(res => this.setState(res.data, () => console.log(this.state)));
// }
//
// fetchTV = () => {
//   axios.get('/api/tmdbmovies', {
//     headers: {
//       Authorization: `Bearer ${Auth.getToken()}`
//     }
//   })
//     .then(res => console.log(`here is res: ${res}`));
// }
