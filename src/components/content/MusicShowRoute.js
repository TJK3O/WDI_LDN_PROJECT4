import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class MusicShowRoute extends React.Component {

  state = {
    content: {
      artwork: '',
      name: '',
      artists: [],
      album: '',
      mediaType: '',
      previewUrl: '',
      consumedStatus: false,
      userId: ''
    },
    followedUsers: [{
      content: [],
      email: '',
      filmLoverBadge: '',
      followedUsers: '',
      musicLoverBadge: '',
      tvLoverBadge: '',
      username: ''
    }],
    share: false,
    playing: false
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
          // artist: res.data.tracks.items[0].album.artists[0].name,
          artists: res.data.tracks.items[0].album.artists,
          album: res.data.tracks.items[0].album.name,
          mediaType: 'music',
          previewUrl: res.data.tracks.items[0].preview_url,
          consumedStatus: false,
          userId: userId,
          resourceId: res.data.tracks.items[0].id
        }
      }));

    axios.get(`/api/user/${Auth.getPayload().sub}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ followedUsers: res.data.followedUsers }));
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

  handleShareToggle = () => {
    this.setState({ share: !this.state.share }, () => console.log(this.state));
  }

  handleShare = (e) => {
    console.log(e.target.value);
    axios.post(`/api/user/${e.target.value}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
  }

  handlePlay = () => {
    if(this.audioElem.paused) this.audioElem.play();
    else this.audioElem.pause();

    const playing = !this.state.playing;
    this.setState({ playing: playing });
  }

  render() {

    const showContainer = {
      width: '60vw',
      margin: '0 auto'
    };

    const showButtons = {
      width: '30px',
      height: '100%',
      marginRight: '10px',
      paddingBottom: '10px'

    };

    return (
      <section className="columns" style={showContainer}>
        <div className="column">
          <img src={this.state.content.artwork}/>
        </div>
        <div className="column">
          <h1>{this.state.content.name}</h1>
          <ul>{this.state.content.artists.map((artist, i) =>
            <li key={i}>{artist.name}</li>
          )} </ul>
          <audio src={this.state.content.previewUrl} ref={element => this.audioElem = element}></audio>
          <div>
            <img
              style={showButtons}
              src={!this.state.playing ? '/assets/play.png' : '/assets/pause.png'}
              onClick={this.handlePlay}
            />
            <img
              style={showButtons}
              src="/assets/plus.png"
              onClick={this.handleAdd}
            />
            <img
              style={showButtons}
              src="/assets/tick.png"
              onClick={this.handleContentConsumed}
            />
            {/* Share this content with a followedUser */}
            <img
              style={showButtons}
              src="/assets/share.png"
              onClick={this.handleShareToggle}
            />
            {this.state.share &&
                <ul className="columns is-multiline">
                  {this.state.followedUsers.map((user, i) =>
                    <div key={i} className="column is-one-third">
                      <button
                        value={user._id}
                        onClick={this.handleShare}
                      >{user.username}</button>
                    </div>
                  )}
                </ul>
            }
          </div>
        </div>

      </section>
    );
  }
}

export default MusicShowRoute;
