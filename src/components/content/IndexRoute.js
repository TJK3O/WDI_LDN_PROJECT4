import React from 'react';
import axios from 'axios';
// This is a search bar to allow users to search for specific content by hitting return
import Search from '../common/Search';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
// ResultsDisplay renders a list of content for the relevant mediatype
import ResultsDisplay from './ResultsDisplay';



//---------------------------------------//
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

  // This function changes the content type being displayed to what the user has selected
  handleContentSelection = (e) => {
    this.setState({ selectedContent: e.target.name, musicSearch: '', filmsSearch: '', tvSearch: '' });
  }

  // This function stores a users search string in state as they type
  handleMusicChange = (e) => {
    this.setState({ musicSearchResults: [] });
    this.setState({ musicSearch: e.target.value });
  }

  // This function submits a users search results and sets state to be the response
  handleMusicSubmit = (e) => {
    e.preventDefault();
    // This makes a request to our back end which in turn makes a request to Spotifys API
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
      .then(res => this.setState({ musicSearchResults: res.data.tracks.items }));
  }

  handleFilmsChange = (e) => {
    this.setState({ filmsSearchResults: [] });
    this.setState({ filmsSearch: e.target.value });
  }

  handleFilmsSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/tmdbmovies', {
      params: {
        query: this.state.filmsSearch
      },
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ filmsSearchResults: res.data.results }));
  }

  handleTvChange = (e) => {
    this.setState({ tvSearchResults: [] });
    this.setState({ tvSearch: e.target.value });
  }

  handleTvSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/tmdbTv', {
      params: {
        query: this.state.tvSearch
      },
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ tvSearchResults: res.data.results }));
  }

  componentDidMount() {
    // Music is the automatic category when the page loads
    if(!this.state.selectedContent) {
      this.setState({ selectedContent: 'music' });
      axios.get('/api/spotify/topMusic', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => this.setState({ music: res.data }));
      // We make a request for the other media types so that they are immediately available should a user switch
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


        {/* The content-nav lets a user select their mediatype */}
        <div className="content-nav">
          <a
            className={this.state.selectedContent === 'music' ? 'content-nav-buttons-active' : 'content-nav-buttons'}
            onClick={this.handleContentSelection}
            name="music"
          >music</a> |
          <a
            className={this.state.selectedContent === 'films' ? 'content-nav-buttons-active' : 'content-nav-buttons'}
            onClick={this.handleContentSelection}
            name="films"
          > films</a> |
          <a
            className={this.state.selectedContent === 'tv' ? 'content-nav-buttons-active' : 'content-nav-buttons'}
            onClick={this.handleContentSelection}
            name="tv"
          > tv</a> |
          <a
            className={this.state.selectedContent === 'users' ? 'content-nav-buttons-active' : 'content-nav-buttons'}
            onClick={this.handleContentSelection}
            name="users"
          > users</a>
        </div>


        {/* Only the search bar for the specific content that is currently displayed is shown  */}
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


        {/* This section displays the music results in a list */}
        {this.state.music.items && !this.state.musicSearch && this.state.selectedContent === 'music' &&
        <ResultsDisplay music={this.state.music.items} />
        }

        {this.state.selectedContent === 'music' && this.state.musicSearch && this.state.musicSearchResults.length < 1 &&
        <h1>Search for your favourite track by typing it&apos;s name and hitting return...</h1>
        }

        {this.state.selectedContent === 'music' && this.state.musicSearch && this.state.musicSearchResults &&
          <ResultsDisplay music={this.state.musicSearchResults} />
        }


        {/* This section displays the films results in a list */}
        {this.state.films.results && !this.state.filmsSearch && this.state.selectedContent === 'films' &&
        <ResultsDisplay films={this.state.films.results} />
        }

        {this.state.selectedContent === 'films' && this.state.filmsSearch && this.state.filmsSearchResults.length < 1 &&
        <h1>Search for your favourite film by typing it&apos;s name and hitting return...</h1>
        }

        {this.state.selectedContent === 'films' && this.state.filmsSearch &&
          <ResultsDisplay films={this.state.filmsSearchResults} />
        }


        {/* This section displays the TV results in a list */}
        {this.state.tv.results && !this.state.tvSearch && this.state.selectedContent === 'tv' &&
          <ResultsDisplay tv={this.state.tv.results} />
        }

        {this.state.selectedContent === 'tv' && this.state.tvSearch && this.state.tvSearchResults.length < 1 &&
        <h1>Search for your favourite TV show by typing it&apos;s name and hitting return...</h1>
        }

        {this.state.selectedContent === 'tv' && this.state.tvSearch &&
          <ResultsDisplay tv={this.state.tvSearchResults} />
        }


        {/* This section displays all the users on the platform in a list */}
        {this.state.selectedContent === 'users' &&
          <ResultsDisplay users={this.state.users} />
        }
      </section>
    );
  }
}

export default IndexRoute;
