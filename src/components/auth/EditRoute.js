import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import ReactFilestack from 'filestack-react';

class EditRoute extends React.Component {

  state = {
    username: 'Tom',
    email: 'tom@me.com',
    password: 'password',
    passwordConfirmation: 'password',
    content: [],
    musicLoverBadge: '',
    filmLoverBadge: '',
    image: ''
  }

  componentDidMount() {
    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .then(console.log(Auth.getPayload().sub));
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/${Auth.getPayload().sub}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push(`/user/${this.props.match.params.id}`));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="username"
          name="username"
          onChange={this.handleChange}
        />
        <ReactFilestack
          apikey={'AathCQHBORnSzPBb8eXW6z'}
          buttonText="Click me"
          buttonClass="classname"
          // options={options}
          onSuccess={res => this.setState({ image: res.filesUploaded[0].url })}
        />
        <img src={`${this.state.image}`} />
        <button>Submit</button>
      </form>
    );
  }
}

export default EditRoute;