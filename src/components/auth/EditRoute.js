import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import ReactFilestack from 'filestack-react';

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
    axios.get(`/api/user/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState(res.data, ()=> console.log(this.state)));
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/${Auth.getPayload().sub}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
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
          // options={options}
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
