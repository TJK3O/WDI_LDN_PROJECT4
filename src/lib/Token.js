class Token {

  _token = null;

  static setToken(token) {
    const retrieveUrl = window.location.href;
    const retrieveToken = retrieveUrl.split('=')[1];
    const accessToken = 'Bearer ' + retrieveToken;

    axios.get('https://api.spotify.com/v1/users/spotifycharts/playlists/37i9dQZEVXbLnolsZ8PSNw', {headers: {
      Accept: '	application/json',
      Authorization: accessToken
    }})
      .then(res => this.setState({ content: res.data.tracks.items, accessToken: accessToken }, () => console.log(this.state)));
  }

  static getToken() {
    return this._token;
  }
}

export default Token;
