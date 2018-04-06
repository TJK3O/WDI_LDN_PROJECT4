import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Login extends React.Component {

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(res => console.log(res))
      .then(() => this.props.history.push('/content'));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          name="email"
        />
        <input
          onChange={this.handleChange}
          name="password"
        />
        <button>Login</button>
      </form>
    );
  }
}

export default Login;
