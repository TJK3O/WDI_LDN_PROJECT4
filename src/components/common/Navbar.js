import React from 'react';
// withRouter lets us pass in history from props
import { Link, withRouter } from 'react-router-dom';
// import Auth
import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/login');
  }

  componentWillUpdate() {
    if(this.state.navIsOpen) this.setState({ navIsOpen: false });
  }

  render() {

    return (
      <nav
        className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            content
          </Link>
          <div
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/content">Browse content</Link>
            {Auth.isAuthenticated() &&
              <div>
                <Link className="navbar-item" to={`/user/${Auth.getPayload().sub}`}>Profile</Link>
                <a className="navbar-item" onClick={this.handleLogout}>Logout</a>
              </div>
            }
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
