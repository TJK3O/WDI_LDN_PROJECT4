import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class FilmsShowRoute extends React.Component {

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

    axios.get(`/api/tmdbmovies/show/${tmdbId}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res =>
        this.setState({
          content: {
            artwork: `https://image.tmdb.org/t/p/w500/${res.data.poster_path}`,
            name: res.data.title,
            overview: res.data.overview,
            mediaType: 'film',
            consumedStatus: false,
            userId: userId,
            resourceId: res.data.imdb_id
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
    return (
      <section>
        <h1>Show</h1>
        <img src={this.state.content.artwork}/>
        <div>
          <button
            onClick={this.handleAdd}
          >Add</button>
          {/* <button
            onClick={this.handleContentConsumed}
          >Ticked</button> */}
        </div>

        {/* Share this content with a followedUser */}
        <button
          onClick={this.handleShareToggle}
        >Share</button>
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
      </section>
    );
  }
}

export default FilmsShowRoute;
