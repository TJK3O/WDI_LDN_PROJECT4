import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';
import Auth from '../../lib/Auth';

class IndexRoute extends React.Component {

  state = {
    search: '',
    searchResults: []
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get('/api/spotify', {
      params: {
        q: this.state.search,
        type: 'track'
      },
      // Now that spotify is a secure route we need to add an authorization header to the request
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ searchResults: res.data.tracks.items}, () => console.log(this.state.searchResults)));
  }

  componentDidMount() {
    axios.get('/api/spotify/topFifty', {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  render() {
    return (
      <section>
        <h1>Index</h1>
        <Search
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <ul className="columns is-multiline">
          {this.state.searchResults.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.searchResults &&
                <Link to={`/content/${this.state.searchResults[i].external_ids.isrc}`}>
                  <img src={track.album.images[0].url} />
                </Link>}
            </div>)}
        </ul>
        {this.state.items && !this.state.search &&
        <ul className="columns is-multiline">
          {this.state.items.map((track, i) =>
            <div key={i} className="column is-one-third">
              {this.state.items &&
                <Link to={`/content/${this.state.items[i].track.external_ids.isrc}`}>
                  <img src={track.track.album.images[0].url} />
                </Link>}
            </div>
          )}
        </ul>
        }

      </section>
    );
  }
}

export default IndexRoute;
