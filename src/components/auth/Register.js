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

    const formStyles = {
      width: '300px',
      height: '200px',
      margin: '0 auto'
    };

    const inputStyles = {
      width: '100%',
      color: 'grey',
      lineHeight: '1.5em',
      fontSize: '25px',
      outline: 'none',
      border: 'none',
      borderBottom: '4px solid white',
      backgroundColor: 'rgba(255,255,255,0)',
      marginTop: '40px'
    };

    return(
      <form style={formStyles} onSubmit={this.handleSubmit}>
        <input
          style={inputStyles}
          placeholder="username"
          name="username"
          onChange={this.handleChange}
        />
        {this.state.errors.username && <small>{this.state.errors.username}</small>}
        <input
          style={inputStyles}
          placeholder="email"
          name="email"
          onChange={this.handleChange}
        />
        {this.state.errors.email && <small>{this.state.errors.email}</small>}
        <input
          style={inputStyles}
          placeholder="password"
          name="password"
          onChange={this.handleChange}
        />
        {this.state.errors.password && <small>{this.state.errors.password}</small>}
        <input
          style={inputStyles}
          placeholder="password confirmation"
          name="passwordConfirmation"
          onChange={this.handleChange}
        />
        <ReactFilestack
          apikey={'AathCQHBORnSzPBb8eXW6z'}
          buttonText="upload image"
          buttonClass="form-button"
          // options={options}
          onSuccess={res => this.setState({ image: res.filesUploaded[0].url })}
        />
        <button
          className="form-button"
        >register</button>
      </form>
    );
  }
}

export default Register;
