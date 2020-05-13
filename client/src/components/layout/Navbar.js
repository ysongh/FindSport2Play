import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, AppBar, Toolbar, Link } from '@material-ui/core';

import { logoutUser } from '../../actions/authActions';
import { checkNotification } from '../../actions/notificationActions';
import NotificationList from './NotificationList';
import styles from './Navbar.module.css';

import Logo from '../../img/logo.png';

class Navbar extends Component {
  constructor(props){
      super(props);
      this.state = {
          showNotification: false
      };
  }
  
  onShowNotification(e){
      e.preventDefault();
      this.setState(prevState => ({
          showNotification: !prevState.showNotification
      }));
      this.props.checkNotification();
  }
  
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render() {
    const {isAuthenticated, user, notifications} = this.props.auth;

    const notificationList = (
      <div className={styles.notification}>
        <NotificationList notifications={notifications.notification} />
      </div>
    );
    
    const authLinks = (
      <div>
        <button onClick={this.onShowNotification.bind(this)}>
          <i className="far fa-bell notification__icon">
            <sup className={styles.notification__number}>{notifications.unread}</sup>
          </i>
        </button>
        
        { this.state.showNotification ? notificationList : null }
        <Link component={RouterLink} to="/profile" color="textPrimary">
          Welcome, {user.name}
        </Link>
        <Link component={RouterLink} to="/" onClick={this.onLogoutClick.bind(this)} color="textPrimary">
          Logout
        </Link>
      </div>
    );
    
    const guestLinks = (
      <div>
        <Link component={RouterLink} to="/login" color="textPrimary">
          Login
        </Link>
        <Link component={RouterLink} to="/register" color="textPrimary">
          Get Started
        </Link>
      </div>
    );
    
    return (
      <AppBar>
        <Container>
          <Toolbar>
            <Link component={RouterLink} to="/">
              <img src={Logo} className="logo" alt="Logo" data-toggle="collapse" data-target=".navbar-collapse.show" />
            </Link>
            <Link component={RouterLink} to="/events" color="textPrimary">
              {' '}
              List of Events
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);