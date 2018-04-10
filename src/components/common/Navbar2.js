import React from 'react';
// withRouter lets us pass in history from props
import { Link, withRouter } from 'react-router-dom';
// import Auth
import Auth from '../../lib/Auth';

class Navbar2 extends React.Component {

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

    const inactiveBottomNav = {
      textAlign: 'center',
      width: '100%',
      height: '40px',
      position: 'fixed',
      zIndex: '3',
      bottom: '0',
      left: '0',
      backgroundColor: 'lightGrey',
      color: 'white',
      overflowX: 'hidden',
      transition: '0.5s'
    };

    const activeBottomNav = {
      textAlign: 'center',
      width: '100%',
      height: '50vh',
      position: 'fixed',
      zIndex: '3',
      bottom: '0',
      left: '0',
      backgroundColor: 'grey',
      color: 'white',
      overflowX: 'hidden',
      transition: '0.5s',
      overflow: 'scroll'
    };

    return (
      <div
        style={this.state.navIsOpen ? activeBottomNav : inactiveBottomNav}
      >
        <a onClick={this.handleToggle} className="nav-button">Toggle</a>
        <div className="bottom-nav-button">
          <Link className="nav-button" to="/">content</Link>
        </div>
        <div className="bottom-nav-button">
          <Link className="nav-button" to="/content">Browse content</Link>
        </div>
        <div className="bottom-nav-button">
          {Auth.isAuthenticated() &&
            <Link className="nav-button" to={`/user/${Auth.getPayload().sub}`}>Profile</Link>
          }
        </div>
        <div className="bottom-nav-button">
          {Auth.isAuthenticated() &&
            <a onClick={this.handleLogout} className="nav-button">Logout</a>
          }
        </div>
        <div className="bottom-nav-button">
          {!Auth.isAuthenticated() && <Link className="nav-button" to="/login">Login</Link>}
        </div>
        <div className="bottom-nav-button">
          {!Auth.isAuthenticated() && <Link className="nav-button" to="/register">Register</Link>}
        </div>
      </div>

    );
  }
}

export default withRouter(Navbar2);
