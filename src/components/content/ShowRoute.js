import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class ShowRoute extends React.Component {

  state = {
    artwork: '',
    name: '',
    artist: '',
    album: '',
    mediaType: '',
    previewUrl: '',
    consumedStatus: false,
    userId: ''
  }

  findUserId = () => {
    const userId = Auth.getPayload();
    this.setState({ userId: userId.sub });
  }

  componentDidMount() {
    const spotifyId = this.props.match.params.id;
    axios.get('/api/spotify', {
      params: {
        q: `isrc:${spotifyId}`,
        type: 'track'
      },
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({
        artwork: res.data.tracks.items[0].album.images[0].url,
        name: res.data.tracks.items[0].name,
        artist: res.data.tracks.items[0].album.artists[0].name,
        album: res.data.tracks.items[0].album.name,
        mediaType: 'music',
        previewUrl: res.data.tracks.items[0].preview_url,
        consumedStatus: false
      }, () => console.log(this.state)))
      .then(this.findUserId())
      .then(console.log(`user is: ${this.userId}`));
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/content', this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }

  render() {
    return (
      <section>
        <h1>Show</h1>
        <img src={this.state.artwork}/>
        <div>
          <button
            onClick={this.handleAdd}
          >Add</button>
          <button>Done</button>
        </div>
      </section>
    );
  }
}

export default ShowRoute;
