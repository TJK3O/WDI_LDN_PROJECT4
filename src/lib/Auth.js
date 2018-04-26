class Auth {

  // Here we delete a users token from their local storage to log them out
  static logout() {
    localStorage.removeItem('token');
  }

  // Here we set a token to log a user in
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  // Here we get the token so that we can use it in the header of requests
  static getToken() {
    return localStorage.getItem('token');
  }

  // Here we get the token payload so that we can ascertain a users ID
  static getPayload() {
    const token = this.getToken();
    if(!token) return false;

    const parts = token.split('.');
    if(parts.length < 3) return false;

    return JSON.parse(atob(parts[1]));
  }

  // Here we check a user is logged in so that we can secure routes
  static isAuthenticated() {
    const payload = this.getPayload();
    if(!payload || !payload.exp) return false;

    const now = Math.round(Date.now() / 1000);
    return now < payload.exp;
  }

}

export default Auth;
