import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class ShowRoute extends React.Component {

  state = {
    content: {
      artwork: '',
      name: '',
      artist: '',
      album: '',
      mediaType: '',
      previewUrl: '',
      consumedStatus: false,
      userId: ''
    }
  }

  componentDidMount() {
    const spotifyId = this.props.match.params.id;
    const userId = Auth.getPayload().sub;
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
        content: {
          artwork: res.data.tracks.items[0].album.images[0].url,
          name: res.data.tracks.items[0].name,
          artist: res.data.tracks.items[0].album.artists[0].name,
          album: res.data.tracks.items[0].album.name,
          mediaType: 'music',
          previewUrl: res.data.tracks.items[0].preview_url,
          consumedStatus: false,
          userId: userId
        }
      }));
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.put(`/api/user/${this.state.content.userId}/content`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }

  handleContentConsumed = (e) => {
    e.preventDefault();
    const trackId = this.props.match.params.id;
    console.log(trackId);
    // axios.put(`/api/content/${trackId}`, this.state, {
    //   headers: { Authorization: `Bearer ${Auth.getToken()}` }
    // })
    //   .then(() => this.props.history.push('/content'));
  }

  render() {
    return (
      <section>
        <h1>Show</h1>
        <img src={this.state.content.artwork}/>
        <div>
          <button
            onClick={this.handleAdd}
          >Add</button>
          <button
            onClick={this.handleContentConsumed}
          >Ticked</button>
        </div>
      </section>
    );
  }
}

export default ShowRoute;
