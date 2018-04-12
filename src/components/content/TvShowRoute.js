import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class TvShowRoute extends React.Component {

  state = {
    content: {
      artwork: '',
      name: '',
      overview: '',
      mediaType: '',
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
    share: false
  }

  componentDidMount() {
    const tmdbId = this.props.match.params.id;
    const userId = Auth.getPayload().sub;

    axios.get(`/api/tmdbTv/show/${tmdbId}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res =>
        this.setState({
          content: {
            artwork: `https://image.tmdb.org/t/p/w500/${res.data.poster_path}`,
            name: res.data.name,
            overview: res.data.overview,
            mediaType: 'tv',
            consumedStatus: false,
            userId: userId,
            resourceId: res.data.id,
            tvId: res.data.id
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
  //
  // handleContentConsumed = (e) => {
  //   e.preventDefault();
  //   const filmId = this.props.match.params.id;
  //   console.log(filmId);
  //   axios.put(`/api/content/${trackId}`, this.state, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(() => this.props.history.push('/content'));
  // }

  handleShareToggle = () => {
    this.setState({ share: !this.state.share }, () => console.log(this.state));
  }

  handleShare = (e) => {
    console.log(e.target.value);
    axios.post(`/api/user/${e.target.value}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
  }

  render() {

    const showContainer = {
      width: '60vw',
      margin: '0 auto'
    };

    const showButtons = {
      width: '30px',
      height: '40px',
      marginRight: '10px',
      paddingBottom: '10px'

    };

    return (
      <section  className="columns" style={showContainer}>
        <div className="column">
          <img src={this.state.content.artwork}/>

        </div>
        <div className="column">
          <h1>{this.state.content.name}</h1>
          <h2>{this.state.content.overview}</h2>
          <div>
            <img
              style={showButtons}
              src="/assets/plus.png"
              onClick={this.handleAdd}
            />
            {/* Share this content with a followedUser */}
            <img
              style={showButtons}
              src="/assets/share.png"
              onClick={this.handleShareToggle}
            />
            {/* Share this content with a followedUser */}
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

export default TvShowRoute;
