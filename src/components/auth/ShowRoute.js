import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {

  state = {
    username: '',
    email: '',
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
    musicLoverBadge: 0,
    filmLoverBadge: 0,
    tvLoverBadge: 0
  }


  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`)
      .then(res => this.setState(res.data));
  }

handleTick = (content) => {
  // user clicks tick
  // here we store the index of the selcted item
  const index = this.state.content.indexOf(content);
  // here we pick out the mediaType of the clicked item so that we can add 1 to the relevant badge in the ternary
  const badge = `${content.mediaType}LoverBadge`;
  // toggle the content's consumedStatus
  content.consumedStatus = !content.consumedStatus;
  // if consumedStatus is true, add 1 to the relevant badge else take one off.
  const newBadge = content.consumedStatus ? parseInt(this.state[badge] + 1) : parseInt(this.state[badge] - 1);
  // using slice means that we don't mutate state directly, we instead create a new variable containing a copy with our updated content inserted. We passed in the content in a callback function in the render
  const newContent = [
    ...this.state.content.slice(0, index),
    content,
    ...this.state.content.slice(index+1)
  ];
  // next we setState with our newContent and newBadge
  this.setState({ content: newContent, [badge]: newBadge }, () => {
  // finally we need to update the user record so that their to dos remain when they navigate away
    axios.put(`/api/user/${content.userId}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    console.log(this.state);
  });
}

  handleRemove = (content) => {
    // find index of current clicked content
    const index = this.state.content.indexOf(content);
    // create new variable with everything up to but not including clicked content and everything after
    const newContent = [
      ...this.state.content.slice(0, index),
      ...this.state.content.slice(index+1)
    ];

    this.setState({ content: newContent }, () => {
    // finally we need to update the user record so that their to dos remain when they navigate away
      axios.put(`/api/user/${content.userId}`, this.state, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      });
      console.log(this.state);
    });
  }

  render() {
    return (
      <section>
        <h1>Profile page</h1>
        <Link to={`/user/${this.state.content[0].userId}/edit`}>
          Edit profile
        </Link>
        <h2>{this.state.email}</h2>
        <h2>{this.state.username}</h2>
        {this.state.musicLoverBadge === 2 &&
          <h1>User is a music lover!!</h1>
        }
        {this.state.filmLoverBadge === 2 &&
          <h1>User is a film lover!!</h1>
        }
        {this.state.tvLoverBadge === 2 &&
          <h1>User is a tv lover!!</h1>
        }
        <ul className="columns is-multiline">
          {this.state.content.map((content, i) =>
            <li key={i} className="column is-one-third">
              {!this.state.content[i].consumedStatus &&
              <img src={content.artwork} />}
              <button
                value={i}
                onClick={() => this.handleTick(content)}
              >Ticked</button>
              <button
                value={i}
                onClick={() => this.handleRemove(content)}
              >Remove</button>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default ShowRoute;
