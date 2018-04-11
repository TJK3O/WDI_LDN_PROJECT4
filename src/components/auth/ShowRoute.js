import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {

  state = {
    username: '',
    email: '',
    image: '',
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
    axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState(res.data,() => console.log('here: ', this.state)));
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

  // handleRemoveSuggestedContent = (suggestions) => {
  //   console.log(suggestions);
  //   axios.delete(`/api/user/${this.props.match.params.id}`, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(() => this.props.history.push('/content'));
  // }

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

    const main = {
      width: '90vw',
      margin: '0 auto'
    };

    const showButtons = {
      width: '30px',
      height: '100%',
      marginRight: '10px',
      paddingBottom: '10px'
    };

    const categoryFont = {
      color: 'grey',
      fontSize: '30px'
    };

    const hr = {
      width: '100%',
      color: 'grey',
      border: 'none',
      height: '4px'
    };

    return (
      <section style={main}>
        <img src={`${this.state.image}`} />
        <h2>username: {this.state.username}</h2>
        <h2>email {this.state.email}</h2>
        {this.isCurrentUser() &&
          <Link to={`/user/${this.props.match.params.id}/edit`}>
          Edit profile
          </Link>
        }
        {!this.isCurrentUser() &&
          <button onClick={this.handleFollowUser}>Follow this user</button>
        }
        {this.state.musicLoverBadge >2 &&
          <div>
            <img src="/assets/music-medal.png" />
            <h1>User is a music lover!!</h1>
          </div>
        }
        {this.state.filmLoverBadge > 2 &&
          <div>
            <h1>User is a film lover!!</h1>
            <img src="/assets/film-medal.png" />
          </div>
        }
        {this.state.tvLoverBadge > 2 &&
          <div>
            <h1>User is a tv lover!!</h1>
            <img src="/assets/tv-medal.png" />
          </div>
        }
        <div>
          {/* Music Todo */}
          <h1 style={categoryFont}>music</h1>
          <hr style={hr}/>
          <ul className="columns is-multiline">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'music' && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-one-fifth">
                {!this.state.content[i].consumedStatus &&
                    <img src={content.artwork} />}

                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <img
                      style={showButtons}
                      src="/assets/tick.png"
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    />
                    <img
                      style={showButtons}
                      src="/assets/trash.png"
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    />
                  </div>
                }
              </li>
            )}
          </ul>

          {/* Films Todo */}
          <h1 style={categoryFont}>films</h1>
          <hr style={hr}/>
          <ul className="columns is-multiline">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'film'  && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-one-fifth">
                {!this.state.content[i].consumedStatus &&
                    <img src={content.artwork} />}

                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <button
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    >Ticked</button>
                    <button
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    >Remove</button>
                  </div>
                }
              </li>
            )}
          </ul>

          {/* TV Todo */}
          <h1 style={categoryFont}>tv</h1>
          <hr style={hr}/>
          <ul className="columns is-multiline">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'tv'  && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-one-fifth">
                {!this.state.content[i].consumedStatus &&
                    <img src={content.artwork} />}

                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <button
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    >Ticked</button>
                    <button
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    >Remove</button>
                  </div>
                }
              </li>
            )}
          </ul>

          {/* Consumed */}
          <h1 style={categoryFont}>done :)</h1>
          <hr style={hr}/>
          <ul className="columns is-multiline">
            {this.state.content.map((content, i) =>
              this.state.content[i].consumedStatus &&
              <li key={i} className="column is-one-fifth">
                {this.state.content[i].consumedStatus &&
                    <img src={content.artwork} />}

                {this.isCurrentUser() &&
                  <div>
                    <img
                      style={showButtons}
                      src="/assets/cross.png"
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    />
                    <button
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    >Remove</button>
                  </div>
                }
              </li>
            )}
          </ul>
          {this.state.suggestedContent.length > 0 &&
            <div>
              <h1 style={categoryFont}>suggested by others</h1>
              <hr style={hr}/>
            </div>
          }
          <ul className="columns is-multiline">
            {this.state.suggestedContent.map((suggestions, i) =>
              <div key={i}>
                <li className="column is-one-fifth">
                  <img src={suggestions.artwork} />
                </li>
                {this.isCurrentUser() &&
                  <button
                    value={i}
                    onClick={() => this.handleRemoveSuggestedContent(suggestions)}
                  >Remove</button>
                }
              </div>
            )}
          </ul>

          {/* Followed users */}
          {this.state.followedUsers.length > 0 &&
            <div>
              <h1 style={categoryFont}>followed users</h1>
              <hr style={hr}/>
            </div>
          }
          <ul className="columns is-multiline">
            {this.state.followedUsers.map((followedUser, i) =>
              <li key={i} className="column is-one-fifth">
                <img src={followedUser.image} />
                <h1>{followedUser.username}</h1>
                {this.isCurrentUser() &&
                  <button
                    value={i}
                    onClick={() => this.handleRemoveFollowedUser(followedUser)}
                  >Remove</button>
                }
              </li>
            )}
          </ul>

        </div>


      </section>
    );
  }
}

export default ShowRoute;
