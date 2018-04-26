import React from 'react';
import axios from 'axios';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
import Share from '../common/ShareContent';



//---------------------------------------//
class FilmsShowRoute extends React.Component {

  state = {
    content: {
      artwork: '',
      name: '',
      overview: '',
      mediaType: '',
      consumedStatus: false,
      userId: ''
    },
    followedUsers: [{
      content: [],
      email: '',
      filmLoverBadge: '',
      followedUsers: '',
      musicLoverBadge: '',
      tvLoverBadge: '',
      username: ''
    }],
    share: false
  }

  componentDidMount() {
    // In the ResultsDisplay component we link each content to /content/films/:id - this means we can get the id out of the url and request that specific content from the API
    const tmdbId = this.props.match.params.id;
    // We get a user's id from their token
    const userId = Auth.getPayload().sub;

    axios.get(`/api/tmdbmovies/show/${tmdbId}`, {
      // This Authorization header satisfies our backend API
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res =>
        this.setState({
          content: {
            artwork: `https://image.tmdb.org/t/p/w500/${res.data.poster_path}`,
            name: res.data.title,
            overview: res.data.overview,
            mediaType: 'film',
            consumedStatus: false,
            userId: userId,
            resourceId: res.data.imdb_id,
            filmId: res.data.id
          }
        }));

    // Here we get the logged in users followedUsers so that they can share the track with any of them
    axios.get(`/api/user/${Auth.getPayload().sub}`, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(res => this.setState({ followedUsers: res.data.followedUsers }));
  }

  handleAdd = (e) => {
    e.preventDefault();
    // The put request adds the content to a users record
    axios.put(`/api/user/${this.state.content.userId}/content`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      // The user is then redirected to the index page by pushing this into their history
      .then(() => this.props.history.push('/content'));
  }

  handleShareToggle = () => {
    // We toggle displaying followedUsers by setting state to the opposite of what it is
    this.setState({ share: !this.state.share });
  }

  handleShare = (e) => {
    // This posts the content to the record of the clicked user
    axios.post(`/api/user/${e.target.value}/suggestion`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
  }

  render() {

    return (
      <section className="show-container">
        <img
          className="show-image"
          src={this.state.content.artwork}
        />

        {/* Add the item to your todo list */}
        <img
          className="show-buttons"
          src="/assets/plus.png"
          onClick={this.handleAdd}
        />

        {/* Share this content with a followedUser */}
        <img
          className="show-buttons"
          src="/assets/share.png"
          onClick={this.handleShareToggle}
        />
        {/* This list shows all your followedUsers, it is toggled on and off with the handleShareToggle function */}
        {this.state.share &&
          <Share
            followedUsers={this.state.followedUsers}
            share={this.state.share}
            handleShare={this.handleShare}
          />
        }
        <h1>{this.state.content.name}</h1>
        <h2
          className="show-text"
        >{this.state.content.overview}</h2>
        <div>
        </div>

      </section>
    );
  }
}

export default FilmsShowRoute;
