import React from 'react';

import axios from 'axios';
import Search from './Search';

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

    const search = this.state.search;
    axios.get(`/api/spotify/?q=${search}&type=track`)
      .then(res => this.setState({ searchResults: res.data.tracks.items}))
      .then(console.log(this.state.searchResults));
  }

  render() {
    return (
      <section>
        <h1>Index</h1>
        <div>

        </div>
        <Search
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.searchResults.map((track, i) =>
          <li key={i}>
            <img src={track.album.images[0].url} />
          </li>)}
      </section>
    );
  }
}

export default IndexRoute;
