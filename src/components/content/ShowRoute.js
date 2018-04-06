import React from 'react';

import axios from 'axios';


class ShowRoute extends React.Component {

  state = {
    data: {
      album: {
        images: [{url: ''}]
      }
    }
  }

  componentDidMount() {
    const spotifyId = this.props.match.params.id;
    axios.get('/api/spotify', {
      params: {
        q: `isrc:${spotifyId}`,
        type: 'track'
      }
    })
      .then(res => this.setState({ data: res.data.tracks.items[0] }, () => console.log(this.state)));
  }

  render() {
    return (
      <section>
        <h1>Show</h1>
        <img src={this.state.data.album.images[0].url}/>
      </section>
    );
  }
}

export default ShowRoute;
