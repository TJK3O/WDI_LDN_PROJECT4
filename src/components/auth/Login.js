import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class Login extends React.Component {

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/content'));
  }

  render() {

    return(
      <form
        className="form-styles"
        onSubmit={this.handleSubmit}>
        <input
          className="input-styles"
          placeholder="email"
          onChange={this.handleChange}
          name="email"
        />
        <input
          className="input-styles"
          placeholder="password"
          onChange={this.handleChange}
          name="password"
        />
        <button
          className="form-button"
        >Login</button>
      </form>
    );
  }
}

export default Login;
