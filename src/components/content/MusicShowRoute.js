import React from 'react';
import axios from 'axios';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';



//---------------------------------------//
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
    // In the ResultsDisplay component we link each content to /content/music/:id - this means we can get the id out of the url and request that specific content from the API
    const spotifyId = this.props.match.params.id;
    // We get a user's id from their token
    const userId = Auth.getPayload().sub;
    axios.get('/api/spotify', {
      params: {
        q: `isrc:${spotifyId}`,
        type: 'track'
      },
      // This Authorization header satisfies our backend API - which in turn sends a separate header to Spotify with it's request
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({
        content: {
          artwork: res.data.tracks.items[0].album.images[0].url,
          name: res.data.tracks.items[0].name,
          artists: res.data.tracks.items[0].album.artists,
          album: res.data.tracks.items[0].album.name,
          mediaType: 'music',
          previewUrl: res.data.tracks.items[0].preview_url,
          consumedStatus: false,
          userId: userId,
          resourceId: res.data.tracks.items[0].id,
          isrc: res.data.tracks.items[0].external_ids.isrc
        }
      }));

    // Here we get the logged in users followedUsers so that they can share the track with any of them
    axios.get(`/api/user/${Auth.getPayload().sub}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ followedUsers: res.data.followedUsers }));
  }

  handleAdd = (e) => {
    e.preventDefault();
    // The put request adds the content to a users record
    axios.put(`/api/user/${this.state.content.userId}/content`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    // The user is then redirected to the index page by pushing this into their history
      .then(() => this.props.history.push('/content'));
  }

  handleShareToggle = () => {
    // We toggle displaying followedUsers by setting state to the opposite of what it is
    this.setState({ share: !this.state.share });
  }

  handleShare = (e) => {
    // This posts the content to the record of the clicked user
    axios.post(`/api/user/${e.target.value}/suggestion`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
  }

  handlePlay = () => {
    // Audio is paused by default. It will then play if paused and vice versa
    if(this.audioElem.paused) this.audioElem.play();
    else this.audioElem.pause();

    // We store whether the track is paused or playing in state so that we can toggle the img from playing to paused
    const playing = !this.state.playing;
    this.setState({ playing: playing });
  }

  render() {

    return (
      <section className="show-container">
        <img src={this.state.content.artwork}/>
        <div>

          {/* The play button only appears if a previewUrl is defined */}
          {this.state.content.previewUrl &&
          <img
            className="show-buttons"
            // This ternary displays the play button if the music is paused and vice versa
            src={!this.state.playing ? '/assets/play.png' : '/assets/pause.png'}
            onClick={this.handlePlay}
          />
          }

          {/* Add the item to your todo list */}
          <img
            className="show-buttons"
            src="/assets/plus.png"
            onClick={this.handleAdd}
          />

          {/* Share this content with a followedUser */}
          <img
            className="show-buttons"
            src="/assets/share.png"
            onClick={this.handleShareToggle}
          />
          {/* This list shows all your followedUsers, it is toggled on and off with the handleShareToggle function */}
          {this.state.share &&
            <ul className="columns is-multiline">
              {this.state.followedUsers.map((user, i) =>
                <div key={i} className="column is-one-third">
                  <div>
                    <img
                      className="profile-pic followed-user-show-card"
                      src={user.image}
                      value={user._id}
                      onClick={this.handleShare}
                    />
                    <button
                      className="center-button followed-user-show-card"
                      value={user._id}
                      onClick={this.handleShare}
                    >{user.username}</button>
                  </div>

                </div>
              )}
            </ul>
          }
        </div>

        <h1>{this.state.content.name}</h1>
        <ul>{this.state.content.artists.map((artist, i) =>
          <li key={i}>{artist.name}</li>
        )} </ul>
        {/* ref is a react attribute that lets us dynamically change the node. In this case we are playing and pausing */}
        <audio src={this.state.content.previewUrl} ref={element => this.audioElem = element}></audio>
      </section>
    );
  }
}

export default MusicShowRoute;
