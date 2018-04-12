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

    const formStyles = {
      width: '400px',
      margin: '10px auto'
    };

    const inputStyles = {
      width: '100%',
      color: 'grey',
      lineHeight: '1.5em',
      fontSize: '25px',
      outline: 'none',
      border: 'none',
      borderBottom: '4px solid grey',
      backgroundColor: 'rgba(255,255,255,0)'
    };

    // const button = {
    //   width: '60px'
    // };

    return(
      <form
        style={formStyles}
        onSubmit={this.handleSubmit}>
        <input
          style={inputStyles}
          placeholder="email"
          onChange={this.handleChange}
          name="email"
        />
        <input
          style={inputStyles}
          placeholder="password"
          onChange={this.handleChange}
          name="password"
        />
        <button>Login</button>
      </form>
    );
  }
}

export default Login;
