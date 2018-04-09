import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class UserShowRoute extends React.Component {

  state = {
    content: [],
    email: '',
    filmLoverBadge: '',
    followedUsers: [],
    musicLoverBadge: '',
    tvLoverBadge: '',
    username: '',
    _id: ''
  }

  componentDidMount() {
    const theirUserId = this.props.match.params.id;
    // const myUserId = Auth.getPayload().sub;

    axios.get(`/api/content/user/${theirUserId}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res =>
        this.setState({
          content: res.data.content,
          email: res.data.email,
          filmLoverBadge: res.data.filmLoverBadge,
          followedUsers: res.data.followedUsers,
          musicLoverBadge: res.data.musicLoverBadge,
          tvLoverBadge: res.data.tvLoverBadge,
          username: res.data.username,
          _id: res.data._id
        }, () => console.log(this.state)));
  }

  // handleAdd = (e) => {
  //   e.preventDefault();
  //   console.log(this.state);
  //   axios.put(`/api/user/${this.state.content.userId}/content`, this.state, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(() => this.props.history.push('/content'));
  // }
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

  render() {
    return (
      <section>
        <h1>Show</h1>
        <h1>{this.state.username}</h1>
      </section>
    );
  }
}

export default UserShowRoute;
