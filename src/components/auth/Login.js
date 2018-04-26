// This route has a login form to allow a user to try to login
import React from 'react';
import axios from 'axios';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';



//---------------------------------------//
class Login extends React.Component {

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // The post request attempts to log us in
    e.preventDefault();
    axios.post('/api/login', this.state)
      // if successful we are sent back a token and a flash message and redirected to /content
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/content'));
  }

  render() {

    return(
      <div>
        <h1 className="home-main-logo">c o n t e n t</h1>
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
            type="password"
            className="input-styles"
            placeholder="password"
            onChange={this.handleChange}
            name="password"
          />
          <button
            className="form-button"
          >Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
