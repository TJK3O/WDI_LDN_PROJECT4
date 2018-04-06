import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Register extends React.Component {

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('api/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => console.log(this.state))
      .then(() => this.props.history.push('/content'));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="username"
          name="username"
          onChange={this.handleChange}
        />
        <input
          placeholder="email"
          name="email"
          onChange={this.handleChange}
        />
        <input
          placeholder="password"
          name="password"
          onChange={this.handleChange}
        />
        <input
          placeholder="password confirmation"
          name="passwordConfirmation"
          onChange={this.handleChange}
        />
        <button>Register</button>
      </form>
    );
  }
}

export default Register;
