// This route has a registration form to allow a user to register
import React from 'react';
import axios from 'axios';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import ReactFilestack from 'filestack-react';



//---------------------------------------//
class Register extends React.Component {

  state= {
    errors: {},
    // a placeholder image is set in state in case a user chooses not to upload an image with filestack
    image: '/assets/profile-large.png'
  }

  handleChange = ({ target: { name, value }  }) => {
    // As a user types we look out for errors and store them in state
    const errors = Object.assign({}, this.state.errors, { [name]: ''});
    this.setState({ [name]: value, errors });
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
      <div>
        <h1 className="home-main-logo">c o n t e n t</h1>
        <form className="form-styles extra-form-margin" onSubmit={this.handleSubmit}>
          <input
            className="input-styles"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          {/* If a required field is left blank the user will get this error on submitting the form */}
          {this.state.errors.username && <small>{this.state.errors.username}</small>}
          <input
            className="input-styles"
            placeholder="email"
            name="email"
            onChange={this.handleChange}
          />
          {this.state.errors.email && <small>{this.state.errors.email}</small>}
          <input
            type="password"
            className="input-styles"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          />
          {this.state.errors.password && <small>{this.state.errors.password}</small>}
          <input
            type="password"
            className="input-styles"
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
      </div>
    );
  }
}

export default Register;
