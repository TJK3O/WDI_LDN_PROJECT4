import React from 'react';
// withRouter lets us pass in history from props
import { Link, withRouter } from 'react-router-dom';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';



//---------------------------------------//
class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    // We toggle by setting navIsOpen to be the opposite of what it currently is in state
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    // We log the user out and redirect them to /login by pushing this into their history
    Auth.logout();
    this.props.history.push('/login');
  }

  componentWillUpdate() {
    // Before the page has rendered if the nav is open we close it
    if(this.state.navIsOpen) this.setState({ navIsOpen: false });
  }

  render() {

    // These are inline styles for the Navbar component
    const inactiveBottomNav = {
      textAlign: 'center',
      width: '100%',
      height: '80px',
      position: 'fixed',
      zIndex: '3',
      bottom: '0',
      left: '0',
      backgroundColor: 'white',
      color: 'white',
      overflowX: 'hidden',
      transition: '0.5s'
    };

    const activeBottomNav = {
      textAlign: 'center',
      width: '100%',
      height: '350px',
      position: 'fixed',
      zIndex: '3',
      bottom: '0',
      left: '0',
      backgroundColor: 'rgb(203, 230, 255)',
      color: 'white',
      overflowX: 'hidden',
      transition: '0.5s',
      overflow: 'scroll'
    };


    const bottomNavLeft = {
      display: 'inline-block',
      width: '30%'
    };

    const bottomNavRight = {
      display: 'inline-block',
      width: '30%'
    };

    const bottomNavMiddle = {
      display: 'inline-block',
      width: '40%',
      verticalAlign: 'top',
      lineHeight: '4em',
      color: 'black'
    };

    const burger = {
      width: '40px',
      height: '40px',
      float: 'left',
      marginLeft: '10px',
      marginTop: '15px'
    };

    const contentLogo = {
      lineHeight: '2em',
      fontSize: '30px'
    };

    const profile = {
      width: '40px',
      height: '40px',
      float: 'right',
      marginRight: '10px',
      marginTop: '15px'
    };

    return (
      <div
        // This ternary changes the class of the nav according to whether it is open or closed
        style={this.state.navIsOpen ? activeBottomNav : inactiveBottomNav}
      >
        <div style={bottomNavRight}>
          <img
            onClick={this.handleToggle}
            className="nav-button burger-icon"
            src="/assets/burger.png"
            style={burger}
          />
        </div>
        <div style={bottomNavMiddle}>
          <h1 style={contentLogo}>c o n t e n t</h1>
          {this.state.navIsOpen &&
            <div>
              <div className="bottom-nav-button">
                <Link className="nav-button" to="/">h o m e</Link>
              </div>
              <div className="bottom-nav-button">
                <Link className="nav-button" to="/content">b r o w s e</Link>
              </div>
              <div className="bottom-nav-button">

                {/* Certain buttons are only shown if a user is logged in. To check this we use Auth.isAuthenticated() */}
                {Auth.isAuthenticated() &&
                  <a onClick={this.handleLogout} className="nav-button">l o g o u t</a>
                }
              </div>
              <div className="bottom-nav-button">
                {!Auth.isAuthenticated() && <Link className="nav-button" to="/login">l o g i n</Link>}
              </div>
              <div className="bottom-nav-button">
                {!Auth.isAuthenticated() && <Link className="nav-button" to="/register">r e g i s t e r</Link>}
              </div>
            </div>
          }
        </div>
        <div style={bottomNavLeft}>
          {Auth.isAuthenticated() && !this.state.navIsOpen &&
              <Link style={profile} to={`/user/${Auth.getPayload().sub}`}><img src="/assets/profile.png" /></Link>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
