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
        style={this.state.navIsOpen ? activeBottomNav : inactiveBottomNav}
      >
        <div style={bottomNavRight}>
          <img
            onClick={this.handleToggle}
            className="nav-button"
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

export default withRouter(Navbar2);
