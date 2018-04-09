import React from 'react';

import axios from 'axios';
import Auth from '../../lib/Auth';

class TvShowRoute extends React.Component {

  state = {
    content: {
      artwork: '',
      name: '',
      overview: '',
      mediaType: '',
      consumedStatus: false,
      userId: ''
    }
  }

  componentDidMount() {
    const tmdbId = this.props.match.params.id;
    const userId = Auth.getPayload().sub;

    axios.get(`/api/tmdbTv/show/${tmdbId}`, {
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
            mediaType: 'tv',
            consumedStatus: false,
            userId: userId
          }
        }, () => console.log(this.state)));
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.put(`/api/user/${this.state.content.userId}/content`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/content'));
  }
  //
  // handleContentConsumed = (e) => {
  //   e.preventDefault();
  //   const filmId = this.props.match.params.id;
  //   console.log(filmId);
  //   axios.put(`/api/content/${trackId}`, this.state, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(() => this.props.history.push('/content'));
  // }

  render() {
    return (
      <section>
        <h1>Show</h1>
        <img src={this.state.content.artwork}/>
        <div>
          <button
            onClick={this.handleAdd}
          >Add</button>
          {/* <button
            onClick={this.handleContentConsumed}
          >Ticked</button> */}
        </div>
      </section>
    );
  }
}

export default TvShowRoute;
