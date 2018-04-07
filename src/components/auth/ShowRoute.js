import React from 'react';
import axios from 'axios';

class ShowRoute extends React.Component {

  state = {
    user: {
      email: '',
      username: ''
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`)
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
  }

  render() {
    return (
      <section>
        <h1>Profile page</h1>
        <h2>{this.state.user.email}</h2>
        <h2>{this.state.user.username}</h2>
      </section>
    );
  }
}

export default ShowRoute;
