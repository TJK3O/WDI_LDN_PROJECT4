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
    followedUsers: [],
    suggestedContent: [],
    musicLoverBadge: 0,
    filmLoverBadge: 0,
    tvLoverBadge: 0
  }


  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`)
      .then(res => this.setState(res.data));
  }

  handleTickContent = (content) => {
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
    });
  }

  handleRemoveContent = (content) => {
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
    });
  }

  handleRemoveFollowedUser = (followedUser) => {
    console.log(followedUser);
    // we don't need to pass any data for delete requests
    axios.delete(`/api/user/${followedUser._id}/follow`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }

  handleFollowUser = () => {
    console.log(this.state);
    // because the userId is all we need for the post request we don't need to pass any other data. But since post requests require you to pass data, we pass null.
    axios.post(`/api/user/${this.props.match.params.id}/follow`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }

  isCurrentUser = () => {
    // this checks that the id in the url matches the id of the logged in user. This means that we can show an edit button below only if the profile page being shown is that of the logged in user. And conversely we can show a follow button only if the profile page is NOT that of the logged in user.
    return this.props.match.params.id === Auth.getPayload().sub;
  }

  render() {
    return (
      <section>
        <h1>Profile page</h1>
        {this.isCurrentUser() &&
          <Link to={`/user/${this.state.content[0].userId}/edit`}>
            Edit profile
          </Link>
        }
        {!this.isCurrentUser() &&
          <button onClick={this.handleFollowUser}>Follow this user</button>
        }
        <h2>{this.state.email}</h2>
        <h2>{this.state.username}</h2>
        {this.state.musicLoverBadge >2 &&
          <h1>User is a music lover!!</h1>
        }
        {this.state.filmLoverBadge > 2 &&
          <h1>User is a film lover!!</h1>
        }
        {this.state.tvLoverBadge > 2 &&
          <h1>User is a tv lover!!</h1>
        }

        <ul className="columns is-multiline">
          {this.state.content.map((content, i) =>
            <li key={i} className="column is-one-third">
              {!this.state.content[i].consumedStatus &&
              <img src={content.artwork} />}
              <button
                value={i}
                onClick={() => this.handleTickContent(content)}
              >Ticked</button>
              <button
                value={i}
                onClick={() => this.handleRemoveContent(content)}
              >Remove</button>
            </li>
          )}
        </ul>
        <ul className="columns is-multiline">
          {this.state.suggestedContent.map((suggestions, i) =>
            <li key={i} className="column is-one-third">
              <img src={suggestions.artwork} />
            </li>
          )}
        </ul>
        <ul className="columns is-multiline">
          {this.state.followedUsers.map((followedUser, i) =>
            <li key={i} className="column is-one-third">
              {!this.state.content[i].consumedStatus &&
              <h1>{followedUser.username} </h1>}
              <button
                value={i}
                onClick={() => this.handleRemoveFollowedUser(followedUser)}
              >Remove</button>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default ShowRoute;
