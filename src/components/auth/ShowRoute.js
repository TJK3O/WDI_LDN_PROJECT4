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
      userId: '',
      isrc: '',
      filmId: ''
    }],
    followedUsers: [],
    suggestedContent: [],
    musicLoverBadge: 0,
    filmLoverBadge: 0,
    tvLoverBadge: 0
  }

  getUser = () => {
    const userId = this.props.match.params.id;
    axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState(res.data,() => console.log('here: ', this.state)));
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id === this.props.match.params.id) return false;
    this.getUser();
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
    this.setState({ content: newContent, [badge]: parseInt(newBadge) }, () => {
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

  handleRemoveSuggestedContent = (suggestions) => {
    console.log(suggestions);
    axios.delete(`/api/user/${this.props.match.params.id}/suggestion/${suggestions.resourceId}`, {
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

  hasConsumedContent = () => {
    return this.state.content.filter(content => content.consumedStatus);
  }

  hasMusicTodo = () => {
    return this.state.content.filter(content => content.mediaType === 'music' && content.consumedStatus === false);
  }

  hasFilmTodo = () => {
    return this.state.content.filter(content => content.mediaType === 'film' && content.consumedStatus === false);
  }

  hasTvTodo = () => {
    return this.state.content.filter(content => content.mediaType === 'tv' && content.consumedStatus === false);
  }

  render() {

    const categoryFont = {
      color: 'white',
      fontSize: '30px'
    };

    return (
      <section className="show-container">
        <div className="profile-card">
          <img src={`${this.state.image}`} className="profile-pic" />
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
        </div>
        <div className="badges-card">
          {this.state.musicLoverBadge > 2 &&
            <img
              src="/assets/music-medal.png"
              className="badges"
            />
          }
          {this.state.filmLoverBadge > 2 &&
            <img
              src="/assets/film-medal.png"
              className="badges"
            />
          }
          {this.state.tvLoverBadge > 2 &&
            <img
              src="/assets/tv-medal.png"
              className="badges"
            />
          }
        </div>

        <div>
          {/* Music Todo */}
          {this.hasMusicTodo().length > 0 &&
            <div>
              <h1 style={categoryFont}>music</h1>
              <hr/>
            </div>
          }
          <ul className="columns is-multiline is-mobile">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'music' && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                {!this.state.content[i].consumedStatus &&
                  <Link to={`/content/music/${this.state.content[i].isrc}`}>
                    <img src={content.artwork} />
                  </Link>
                }



                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <img
                      className="show-buttons"
                      src="/assets/tick.png"
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    />
                    <img
                      className="show-buttons"
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
          {this.hasFilmTodo().length > 0 &&
            <div>
              <h1 style={categoryFont}>films</h1>
              <hr/>
            </div>
          }
          <ul className="columns is-multiline is-mobile">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'film'  && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop">
                {!this.state.content[i].consumedStatus &&
                    <Link to={`/content/films/${this.state.content[i].filmId}`}>
                      <img src={content.artwork} />
                    </Link>
                }

                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <img
                      className="show-buttons"
                      src="/assets/tick.png"
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    />
                    <img
                      className="show-buttons"
                      src="/assets/trash.png"
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    />
                  </div>
                }
              </li>
            )}
          </ul>

          {/* TV Todo */}
          {this.hasTvTodo().length > 0 &&
            <div>
              <h1 style={categoryFont}>tv</h1>
              <hr/>
            </div>
          }
          <ul className="columns is-multiline is-mobile">
            {this.state.content.map((content, i) =>
              this.state.content[i].mediaType === 'tv'  && !this.state.content[i].consumedStatus &&
              <li key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                {!this.state.content[i].consumedStatus &&
                  <Link to={`/content/tv/${this.state.content[i].tvId}`}>
                    <img src={content.artwork} />
                  </Link>
                }

                {this.isCurrentUser() && !this.state.content[i].consumedStatus &&
                  <div>
                    <img
                      className="show-buttons"
                      src="/assets/tick.png"
                      value={i}
                      onClick={() => this.handleTickContent(content)}
                    />
                    <img
                      className="show-buttons"
                      src="/assets/trash.png"
                      value={i}
                      onClick={() => this.handleRemoveContent(content)}
                    />
                  </div>
                }
              </li>
            )}
          </ul>

          {/* Consumed */}

          {this.hasConsumedContent().length > 0 &&
            <div>
              <h1 style={categoryFont}>done :)</h1>
              <hr/>
            </div>
          }

          <ul className="columns is-multiline is-mobile">
            {this.state.content.map((content, i) =>
              this.state.content[i].consumedStatus &&
              <li key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                {this.state.content[i].consumedStatus &&
                    <img src={content.artwork} />}

                {this.isCurrentUser() &&
                  <div>
                    <img
                      className="show-buttons"
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

          {/* Suggested */}
          {this.state.suggestedContent.length > 0 &&
            <div>
              <h1 style={categoryFont}>suggested by others</h1>
              <hr/>
            </div>
          }
          <ul className="columns is-multiline is-mobile">
            {this.state.suggestedContent.map((suggestions, i) =>
              <div key={i}>
                <li className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">


                  {suggestions.mediaType === 'music' &&
                <Link to={`/content/music/${suggestions.isrc}`}>
                  <img src={suggestions.artwork} />
                </Link>
                  }
                  {suggestions.mediaType === 'film' &&
                <Link to={`/content/films/${suggestions.filmId}`}>
                  <img src={suggestions.artwork} />
                </Link>
                  }
                  {suggestions.mediaType === 'tv' &&
                <Link to={`/content/tv/${suggestions.tvId}`}>
                  <img src={suggestions.artwork} />
                </Link>
                  }

                </li>
                {this.isCurrentUser() &&
                  <img
                    className="show-buttons"
                    src="/assets/trash.png"
                    value={i}
                    onClick={() => this.handleRemoveSuggestedContent(suggestions)}
                  />
                }
              </div>
            )}
          </ul>

          {/* Followed users */}
          {this.state.followedUsers.length > 0 &&
            <div>
              <h1 style={categoryFont}>followed users</h1>
              <hr/>
            </div>
          }
          <ul className="columns is-multiline is-mobile">
            {this.state.followedUsers.map((followedUser, i) =>
              <li key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <Link to={`/user/${followedUser._id}`}>
                  <img
                    className="profile-pic"
                    src={followedUser.image}
                  />
                </Link>
                <h1>{followedUser.username}</h1>
                {this.isCurrentUser() &&
                  <img
                    className="show-buttons"
                    src="/assets/trash.png"
                    value={i}
                    onClick={() => this.handleRemoveFollowedUser(followedUser)}
                  />
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
