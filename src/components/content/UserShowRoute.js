import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class UserShowRoute extends React.Component {

  state = {
    followedUsers: {
      content: '',
      email: '',
      filmLoverBadge: '',
      musicLoverBadge: '',
      tvLoverBadge: '',
      username: '',
      userId: ''
    }
  }


  componentDidMount() {
    const theirUserId = this.props.match.params.id;

    axios.get(`/api/content/user/${theirUserId}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({
        followedUsers: {
          content: res.data.content,
          email: res.data.email,
          filmLoverBadge: res.data.filmLoverBadge,
          musicLoverBadge: res.data.musicLoverBadge,
          tvLoverBadge: res.data.tvLoverBadge,
          username: res.data.username,
          userId: theirUserId
        }
      }, () => console.log(this.state)));
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.put(`/api/user/${Auth.getPayload().sub}/followuser`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }

  render() {
    return (
      <section>
        <h1>Show</h1>
        <h1>{this.state.followedUsers.username}</h1>
        <button
          onClick={this.handleAdd}
        >Add</button>
        <button
          onClick={this.log}
        >Log
        </button>
      </section>
    );
  }
}

export default UserShowRoute;
