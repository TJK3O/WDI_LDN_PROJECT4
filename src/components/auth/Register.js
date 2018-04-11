import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import ReactFilestack from 'filestack-react';

class Register extends React.Component {

  state= {
    errors: {},
    image: '/assets/profile-large.png'
  }

  handleChange = ({ target: { name, value }  }) => {
    const errors = Object.assign({}, this.state.errors, { [name]: ''});
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('api/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push('/content'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="username"
          name="username"
          onChange={this.handleChange}
        />
        {this.state.errors.username && <small>{this.state.errors.username}</small>}
        <input
          placeholder="email"
          name="email"
          onChange={this.handleChange}
        />
        {this.state.errors.email && <small>{this.state.errors.email}</small>}
        <input
          placeholder="password"
          name="password"
          onChange={this.handleChange}
        />
        {this.state.errors.password && <small>{this.state.errors.password}</small>}
        <input
          placeholder="password confirmation"
          name="passwordConfirmation"
          onChange={this.handleChange}
        />
        <ReactFilestack
          apikey={'AathCQHBORnSzPBb8eXW6z'}
          buttonText="upload image"
          buttonClass="classname"
          // options={options}
          onSuccess={res => this.setState({ image: res.filesUploaded[0].url })}
        />
        <button>Register</button>
      </form>
    );
  }
}

export default Register;
