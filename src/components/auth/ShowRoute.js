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
    }],
    musicLoverBadge: 0
  }


  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`)
      .then(res => this.setState(res.data));
  }

  handleTick = (e) => {
    // Tick if unticked and untick if ticked, and add 1 to musicLoverBadge if ticked::
    const content = this.state.content[e.target.value];
    const state = this.state;
    !content.consumedStatus ? (content.consumedStatus = true, state.musicLoverBadge += 1 ) : (content.consumedStatus = false, state.musicLoverBadge -= 1);
    // As we have changed state using the variable above we need to update state with forceUpdate
    this.forceUpdate();
    console.log(this.state, this.state.musicLoverBadge);
  }

  render() {
    return (
      <section>
        <h1>Profile page</h1>
        <h2>{this.state.email}</h2>
        <h2>{this.state.username}</h2>
        {this.state.musicLoverBadge === 2 &&
          <h1>User is a music lover!!</h1>
        }
        <ul className="columns is-multiline">
          {this.state.content.map((content, i) =>
            <li key={i} className="column is-one-third">
              {!this.state.content[i].consumedStatus &&
              <img src={content.artwork} />}
              <button
                value={i}
                onClick={this.handleTick}
              >Ticked</button>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default ShowRoute;
