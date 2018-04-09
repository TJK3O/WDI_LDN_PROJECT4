import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class EditRoute extends React.Component {

  state = {
    username: 'Tom',
    email: 'tom@me.com',
    password: 'password',
    passwordConfirmation: 'password',
    content: [],
    musicLoverBadge: '',
    filmLoverBadge: ''
  }

  componentDidMount() {
    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/${Auth.getPayload().sub}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => Auth.setToken(res.data.token))
      .then(() => console.log(this.state))
      .then(() => this.props.history.push(`/user/${Auth.getPayload().sub}`));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="username"
          name="username"
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default EditRoute;
