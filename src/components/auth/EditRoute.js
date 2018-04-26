// This route lets a user edit their profile
import React from 'react';
import axios from 'axios';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
// This is a 3rd party module for integrating filestack into a react component
import ReactFilestack from 'filestack-react';



//---------------------------------------//
class EditRoute extends React.Component {

  state = {
    username: '',
    email: '',
    content: [],
    musicLoverBadge: '',
    filmLoverBadge: '',
    image: ''
  }

  componentDidMount() {
    // This request retrieves the user's data from the database and sets it in state. We want to prepoulate all of their information so that we don't update their record with empty strings
    axios.get(`/api/user/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState(res.data));
  }

  handleChange = (e) => {
    // We are only allowing them to change their username so no other keys are needed
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // We use a put request here as we are updating the users record
    axios.put(`/api/user/${Auth.getPayload().sub}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      // We then push them back to the their profile page
      .then(() => this.props.history.push(`/user/${this.props.match.params.id}`));
  }

  render() {
    return(
      <form className="form-styles" onSubmit={this.handleSubmit}>
        <input
          className="input-styles"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <ReactFilestack
          apikey={'AathCQHBORnSzPBb8eXW6z'}
          buttonText="upload new photo"
          buttonClass="form-button"
          onSuccess={res => this.setState({ image: res.filesUploaded[0].url })}
        />
        <img src={`${this.state.image}`} />
        <button
          className="form-button edit-button"
        >Submit</button>
      </form>
    );
  }
}

export default EditRoute;
