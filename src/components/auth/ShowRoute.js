import React from 'react';
import axios from 'axios';

class ShowRoute extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    content: [{
      artwork: '',
      name: '',
      artist: '',
      album: '',
      mediaType: '',
      previewUrl: '',
      consumedStatus: '',
      userId: ''
    }]
  }


  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`)
      .then(res => this.setState(res.data));
  }

  handleTick = (e) => {
    const content = this.state.content[e.target.value];
    content.consumedStatus ? content.consumedStatus = false : content.consumedStatus = true;
    // As we have changed state using the variable above we need to update state with forceUpdate
    this.forceUpdate();
    console.log(this.state);
  }

  render() {
    return (
      <section>
        <h1>Profile page</h1>
        <h2>{this.state.email}</h2>
        <h2>{this.state.username}</h2>
        {this.state.content.map((content, i) =>
          <li key={i}>
            {!this.state.content[i].consumedStatus &&
            <img src={content.artwork} />}
            <button
              value={i}
              onClick={this.handleTick}
            >Ticked</button>
          </li>
        )}
      </section>
    );
  }
}

export default ShowRoute;
